const User = require('../models/user');

var minute = 10;//设置分钟数

module.exports = {
    'POST /signin': async (ctx, next) => {
        var
            _email = ctx.request.body.email || '',
            _password = ctx.request.body.password || '';
        var user = await User.findOne({
            where: {
                email: _email,
                password: _password
            }
        });
        // console.log(user);
        if (user) {
            console.log(user.author);
            var date = new Date();
            date.setTime(date.getTime() + minute * 60 * 1000);
            ctx.cookies.set('user', _email, { expires: date});
            ctx.cookies.set('author', user.author, { expires: date});
            ctx.body = {
                result: 'ok'
            }
        } else {
            // console.log('signin failed!');
            // ctx.render('signin-failed.html', {
            //     title: 'Sign In Failed'
            // });
            ctx.body = {
                result: 'failed'
            }
        }
    }
};
