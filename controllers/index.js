module.exports = {
    'GET /': async (ctx, next) => {
        //function render(view, model)
        ctx.render('index.html', {
            title: 'Welcome'
        });
    }
};