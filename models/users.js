/**
 * Created by lwy on 2017-03-09.
 */
var User = require('../lib/mongo').User;

module.exports = {
    // 注册一个用户
    create: function create(user) {
        return User.create(user).exec();
    }
};