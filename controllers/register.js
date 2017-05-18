module.exports = {
    'GET /register': async (ctx, next) => {
        //function render(view, model)
        ctx.render('register.html', {
            title: '注册'
        });
    }
};