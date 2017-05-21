const Collect = require('../models/collects');
const Book = require('../models/book');
const User = require('../models/user');

var getUid = async (userName) => {
    if (!userName) {
        return null;
    }
    return await User.findOne({
        where: {
            email: userName
        }
    }).then((res) => {
        return res.id;
    });
}

var findBooks = async (_uid) => {
    let books_ids = await Collect.findAll({
        where: {
            uid: _uid
        }
    }).then((res) => {
        let temp = [];
        for (let i in res) {
            temp.push({ id: res[i].dataValues.bid });
        }
        return temp;
    });
    let books_result = await Book.findAll({
        where: {
            $or: books_ids
        },
        attributes: ['id', 'bookName', 'author']
    }).then((res) => {
        let temp = [];
        let result = [];
        for (let i in res) {
            temp.push(res[i].dataValues.id);
            temp.push(res[i].dataValues.bookName);
            temp.push(res[i].dataValues.author);
            result.push(temp);
            temp = [];
        }
        return result;
    });
    return books_result;
}

module.exports = {
    'GET /collect': async (ctx, next) => {
        var _uid = await getUid(ctx.cookies.get('user'));
        if (_uid) {
            // 查找所有收藏书的bid
            var _books = await findBooks(_uid);
            ctx.render('myBooks.html',{
                book:_books
            });
        } else {
            ctx.render('login.html',{
                title: 'Login'
            })
        }
    },
    'POST /collect': async (ctx, next) => {
        var user_name = ctx.cookies.get('user');
        var _uid = await User.findOne({
            where: {
                email: user_name
            }
        }).then((res) => {
            return res.id;
        });
        var _bid = ctx.request.header.referer.split("?")[1];
        if (!_bid.startsWith('b-')) {
            _bid = _bid.substring(3);
        }
        var isExist = await Collect.findOne({
            where: {
                bid: _bid,
                uid: _uid
            }
        });
        if (isExist) {
            ctx.body = {
                result: 'exist'
            }
        } else {
            var now = Date.now();
            if (_uid) {
                var result = await Collect.create({
                    id: 'c-' + now,
                    uid: _uid,
                    bid: _bid,
                    createdAt: now,
                    updatedAt: now,
                    version: 0
                });
                if (result) {
                    ctx.body = {
                        result: "ok"
                    }
                } else {
                    ctx.body = {
                        result: "failed"
                    }
                }
            } else {
                ctx.body = {
                    result: "nologin"
                }
            }
        }
    }
}