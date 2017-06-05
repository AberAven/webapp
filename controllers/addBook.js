const Book = require('../models/book');
const User = require('../models/user');
const db = require('../db');
const fs = require('fs')

var writeData2File = async (data, now) => {
    dir = './static/img/' + 'b-' + now;
    try {
        fs.writeFileSync(dir, data, (err) => {
            if (err) {
                console.log("Image isn\'s saved! error: \n");
                throw err;
            }
        });
    } catch (error) {
        console.log(error);
        return null;
    }
    return dir;
}

module.exports = {
    'GET /add_book': async (ctx, next) => {
        //function render(view, model)
        ctx.render('addBook.html', {
            title: '添加图书',
            options: db.BOOK_TYPES_NAME
        });
    },
    'POST /add': async (ctx, next) => {
        var
            _bookname = ctx.request.body.bookname,
            _author = ctx.request.body.author,
            _classification = ctx.request.body.classification,
            tmp_needPay = ctx.request.body.needPay,
            _price = Number(ctx.request.body.price),
            _needPay,
            _imgData = ctx.request.body.cover;
        var now = Date.now();
        var imgDir = await writeData2File(_imgData, now);
        if(imgDir==null){
            ctx.body = {
                result: 'imgError'
            }
            return;
        }
        if (tmp_needPay == 1) {
            _needPay = true;
        } else {
            _needPay = false;
        }
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
            _classification = db.BOOK_TYPES_NAME.indexOf(_classification) + 1;
            var book = await Book.create({
                id: 'b-' + now,
                uid: user.id,
                bookName: _bookname,
                chapterId: 'undefined',
                author: _author,
                votes: 0,
                classification: _classification,
                needPay: _needPay,
                price: _needPay ? 0 : _price,
                img: imgDir,
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
