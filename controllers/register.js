const User = require('../models/user');

module.exports = {
    'GET /register': async(ctx, next) => {
        //function render(view, model)
        ctx.render('register.html', {
            title: '注册'
        });
    },
    'POST /register': async(ctx, next) => {
        var
            _email = ctx.request.body.email,
            _password = ctx.request.body.password,
            author = ctx.request.body.author;

        var _author;
        if (author == 0) {
            _author = false;
        } else {
            _author = true;
        }
        var now = Date.now();
        var respone_user = await User.create({
            id: 'g-' + now,
            email: _email,
            password: _password,
            name: _email,
            gender: false,
            birth: '2007-07-07',
            author: _author,
            createdAt: now,
            updatedAt: now,
            version: 0
        });
        if (respone_user) {
            ctx.body = 'ok';
        } else {
            ctx.body = 'failed';
        }
    }
};
