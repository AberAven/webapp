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
            arr1.push({
                bookName: __books[i].dataValues.bookName,
                author: __books[i].dataValues.author,
                id: __books[i].dataValues.id
            });
            if ((i + 1) % 3 == 0 || i + 1 == __books.length) {
                result.push(arr1);
                arr1 = [];
            }
        }
        var hot_book = [];
        for (let j = 0; j < __books.length && j < 7; j++) {
            let temp = [];
            temp.push(__books[j].dataValues.id);
            temp.push(__books[j].dataValues.bookName);
            hot_book.push(temp);
        }
        ctx.render('index.html', {
            title: '书城',
            isLogin: is_login,
            isAuthor: _author,
            books: result,
            hot_books: hot_book
        });
    },
    'POST /search': async (ctx, next) => {
        // ctx.request.url.split('?')[1].substring(7);
        var bookName = ctx.request.body.search;
        console.log(bookName);
        var books = await Book.findAll({
            where: {
                bookName: {
                    $like: bookName + '%'
                }
            }
        }).then((res) => {
            return res;
        });
        var result = [];
        var temp = [];
        for (var b in books) {
            temp.push(books[b].dataValues.id);
            temp.push(books[b].dataValues.bookName);
            temp.push(books[b].dataValues.author);
            result.push(temp);
            temp = [];
        }
        if (books) {
            ctx.render('searchResult.html', {
                title: '搜索结果',
                book: result
            });
        } else {
            ctx.render('searchResult.html', {
                title: '搜索结果'
            });
        }
    }
};