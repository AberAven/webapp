const Book = require('../models/book');
const User = require('../models/user');

var getUserAccount = async(cookies)=>{
    return await User.findOne({
        where:{
            email:cookies
        }
    }).then((res)=>res.account);
}

module.exports = {
    'GET /': async (ctx, next) => {
        //function render(view, model)
        var is_login;
        var coo = ctx.cookies.get('user') || undefined;
        var author = ctx.cookies.get('author') || undefined;
        var _author;
        var _account = 0;
        if (author) {
            _author = true;
        } else {
            _author = false;
        }
        if (coo) {
            is_login = true;
            _account = await getUserAccount(coo);
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
        var sorted_book = await Book.findAll({
            order:'votes DESC',
            limit:7
        });
        for (let j = 0; j < sorted_book.length && j < 7; j++) {
            let temp = [];
            temp.push(sorted_book[j].dataValues.id);
            temp.push(sorted_book[j].dataValues.bookName);
            hot_book.push(temp);
        }
        ctx.render('index.html', {
            title: '书城',
            isLogin: is_login,
            isAuthor: _author,
            account:_account,
            books: result,
            hot_books: hot_book
        });
    },
    'POST /search': async (ctx, next) => {
        // ctx.request.url.split('?')[1].substring(7);
        var bookName = ctx.request.body.search;
        bookName = bookName.replace(/\s+/g, "");
        console.log(bookName);
        var books = await Book.findAll({
            where: {
                bookName: {
                    $like: '%' + bookName + '%'
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