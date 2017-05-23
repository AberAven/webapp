const Book = require('../models/book');
const User = require('../models/user');
const db = require('../db');

module.exports = {
    'GET /add_book': async(ctx, next) => {
        //function render(view, model)
        ctx.render('addBook.html', {
            title: '添加图书',
            options:db.BOOK_TYPES_NAME
        });
    },
    'POST /add': async(ctx, next) => {
        var
            _bookname = ctx.request.body.bookname,
            _author = ctx.request.body.author,
            _classification = ctx.request.body.classification;
        var _email = ctx.cookies.get('user') || null;
        if (_email == null) {
            ctx.body = {
                result: 'failed'
            }
        } else {
            var user = await User.findOne({
                where: {
                    email: _email
                }
            });
            _classification = db.BOOK_TYPES_NAME.indexOf(_classification)+1;
            var now = Date.now();
            var book = await Book.create({
                id: 'b-' + now,
                uid: user.id,
                bookName: _bookname,
                chapterId: 'undefined',
                author: _author,
                votes:0,
                classification: _classification,
                createdAt: now,
                updatedAt: now,
                version: 0
            });
            if (book) {
                ctx.body = {
                    result: 'ok'
                }
            } else {
                ctx.body = {
                    result: 'failed'

                }
            }
        }
    }
}
