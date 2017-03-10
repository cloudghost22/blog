/**
 * Created by lwy on 2017-03-07.
 */
var express = require("express");
var router = express.Router();
var PostModel = require('../models/posts');

var checkLogin = require("../middlewares/check").checkLogin;

//GET /posts所有用户或者特定用户的文章页
//eq:GET /posts?author=xxx
router.get('/', function(req, res, next) {
    var author = req.query.author;

    PostModel.getPosts(author)
        .then(function (posts) {
            res.render('posts', {
                posts: posts
            });
        })
        .catch(next);
});

router.post("/",checkLogin,function (req,res,next) {
    var author = req.session.user._id;
    var title = req.fields.title;
    var content = req.fields.content;

    try {
        if (!title.length) {
            throw new Error('请填写标题');
        }
        if (!content.length) {
            throw new Error('请填写内容');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }
    
    var post = {
        author:author,
        title:title,
        content:content,
        pv:0
    }
    
    PostModel.create(post)
        .then(function (result) {
            // 此 post 是插入 mongodb 后的值，包含 _id
            console.log(result);
            post = result.ops[0];
            res.redirect(`/posts/${post._id}`);
        })
        .catch(next);
});

router.get("/create",checkLogin,function (req,res,next) {
    res.render('create');
});

router.get("/:postId",function (req,res,next) {
    res.send(req.flash());
});

router.get("/:postId/edit",checkLogin,function (req,res,next) {
    res.send(req.flash());
});

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function(req, res, next) {
    res.send(req.flash());
});

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function(req, res, next) {
    res.send(req.flash());
});

// POST /posts/:postId/comment 创建一条留言
router.post('/:postId/comment', checkLogin, function(req, res, next) {
    res.send(req.flash());
});

// GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/:commentId/remove', checkLogin, function(req, res, next) {
    res.send(req.flash());
});

module.exports = router;