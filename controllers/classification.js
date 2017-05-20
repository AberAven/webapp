module.exports = {
    'GET /classification': async(ctx, next) => {
        //function render(view, model)
        
        ctx.render('classification.html', {
            title: '分类'
        });
    }
};