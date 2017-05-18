const User = require('../models/user');

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
            console.log('signin ok!');
            ctx.render('signin-ok.html', {
                title: 'Sign In OK',
                name: user.name
            });
        } else {
            console.log('signin failed!');
            ctx.render('signin-failed.html', {
                title: 'Sign In Failed'
            });
        }
    }
};