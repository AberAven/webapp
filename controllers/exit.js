
module.exports = {
    'GET /exit': async (ctx, next) => {
        //function render(view, model)
        ctx.cookies.set("user", null);
        ctx.cookies.set("author", null);
        ctx.render('index.html', {
            title: '书城',
            isLogin: false
        });
    }
};