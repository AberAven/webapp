const Book = require('../models/book');

module.exports = {
    'GET /': async (ctx, next) => {
        //function render(view, model)
        var is_login;
        var coo = ctx.cookies.get('user') || undefined;
        var author = ctx.cookies.get('author') || undefined;
        var _author;
        if (author) {
            _author = true;
        } else {
            _author = false;
        }
        if (coo) {
            is_login = true;
        } else {
            is_login = false;
        }
        var __books = await Book.findAll({
            limit: 20
        })
            .then(res => {
                return res;
            });
        var result = [];
        var arr1 = [];
        for (var i = 0; i < __books.length; i++) {
            if(i%3==0){
                console.log(arr1);
                result.push(arr1);
                arr1 = [];
            }
            arr1.push({
                bookName: __books[i].dataValues.bookName,
                author: __books[i].dataValues.author
            });
        }
        console.log(result);
        ctx.render('index.html', {
            title: '书城',
            isLogin: is_login,
            isAuthor: _author,
            books: result
        });
    }
};