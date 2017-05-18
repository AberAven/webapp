module.exports = {
    'GET /login': async (ctx, next) => {
        //function render(view, model)
        ctx.render('login.html', {
            title: 'Login'
        });
    }
};