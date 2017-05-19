module.exports = {
    'POST /add1': async (ctx, next) => {
        //function render(view, model)
        // ctx.render('addBook.html', {
        //     title: '添加图书'
        // });
        console.log("接受到");
        console.log(ctx.request.body.bookname);
        // ctx.render('index.html',{
        //     title:'书城'
        // });
        ctx.body = {
            result:'ok'
        }
    }
}