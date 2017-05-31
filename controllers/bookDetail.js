const Book = require('../models/book');
const Chapter = require('../models/chapter');
const User = require('../models/user');
const CheckBuy = require('../models/buyeds');

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
    }).catch(err=>{
        console.log(err);
        return null;
    });
}

var updateUserAccount = async (result, amount) => {
    return await User.update({
        account: Number(result.account) - Number(amount)
    }, {
            where: {
                $and: [{ id: result.id }, { account: { $gte: amount } }]
            }
        }).then(res => {
            return res[0] == 1;
        }).catch(err => {
            console.log(err);
            return null;
        });
}

var takeOffAccount = async (uid, amount) => {
    let result = await User.findOne({
        where: {
            email: uid
        }
    }).then((res) => {
        console.log(res);
        return res;
    }).catch((err) => {
        console.log(err);
        return null;
    });
    return await updateUserAccount(result.dataValues, amount);
}

var checkBuyed = async(uid,bid,needPay)=>{
    return needPay!=0?true:await CheckBuy.findOne({
        where:{
            uid:uid,
            bid:bid
        }
    }).then(res=>{
        if(res){
            return true;
        }else{
            return false;
        }
    }).catch(err=>{
        console.log(err);
        return false;
    })
}

module.exports = {
    'GET /bookDetail': async (ctx, next) => {
        var is_author = ctx.cookies.get('author') || false;
        var uid = await getUid(ctx.cookies.get('user'));
        var url = ctx.request.url;
        var _id = url.split('?')[1];
        if (!_id.startsWith('b-')) {
            _id = _id.substring(3);
        }
        var book = await Book.findOne({
            where: {
                id: _id
            }
        }).then(function (res) {
            return res;
        });
        var _chapters = await Chapter.findAll({
            where: {
                bid: _id
            },
            'order': 'chapterNumber ASC'
        }).then((res) => {
            return res;
        });
        var chapters = [];
        var temp = [];
        for (var c in _chapters) {
            temp.push(_chapters[c].dataValues.id);
            temp.push(_chapters[c].dataValues.chapterName);
            temp.push(_chapters[c].dataValues.chapterContent);
            chapters.push(temp);
            temp = [];
        }
        var _isBuyed = await checkBuyed(uid,_id,book.needPay);
        if (book) {
            if (_chapters) {
                ctx.render('book-detail.html', {
                    title: book.bookName,
                    bookName: book.bookName,
                    author: book.author,
                    votes: book.votes,
                    chapters: chapters,
                    isBuyed:_isBuyed,
                    bookprice:book.price,
                    isauchor: is_author
                });
            } else {
                ctx.render('book-detail.html', {
                    title: book.bookName,
                    bookName: book.bookName,
                    author: book.author,
                    votes: book.votes,
                    isBuyed:_isBuyed,
                    bookprice:book.price,
                    isauchor: is_author
                });
            }

        } else {
            ctx.status = 404;
        }

    },
    // 添加章节
    'POST /addChapter': async (ctx, next) => {
        var _bid = ctx.request.header.referer.split("?")[1];
        if (!_bid.startsWith('b-')) {
            _bid = _bid.substring(3);
        }
        var
            _chapterNumber = 1,
            _chapterName = ctx.request.body.chapterName,
            _chapterContent = ctx.request.body.chapterContent;
        var _chapters = await Chapter.findAll({
            where: {
                bid: _bid
            },
            'order': 'chapterNumber DESC'
        }).then((res) => {
            return res;
        });
        if (_chapters && _chapters.length != 0) {
            _chapterNumber = Number(_chapters[0].chapterNumber) + 1;
        }
        var now = Date.now();
        var chapter = await Chapter.create({
            id: 'g-' + now,
            bid: _bid,
            chapterNumber: _chapterNumber,
            chapterName: _chapterName,
            chapterContent: _chapterContent,
            createdAt: now,
            updatedAt: now,
            version: 0
        });
        if (chapter) {
            ctx.body = {
                result: 'ok'
            };
        } else {
            ctx.body = {
                result: 'failed'
            };
        }
    },
    'POST /vote': async (ctx, next) => {
        let _bid = ctx.request.header.referer.split("?")[1];
        if (!_bid.startsWith('b-')) {
            _bid = _bid.substring(3);
        }
        let _uid = ctx.cookies.get('user');
        if (!_uid) {
            ctx.body = {
                result: 'nologin'
            }
            return;
        }
        //扣除10起飞币 返回true or false
        let takeOffRes = await takeOffAccount(_uid, 10);
        if (takeOffRes) {
            //修改书本月票信息
            let res4book = await Book.findById(_bid).then(book => {
                return book.increment(
                    'votes',
                    { by: 1 }
                ).then(res => {
                    return res;
                }).catch(err => {
                    console.log(err);
                    return null;
                });
            }).catch(err => {
                console.log(err);
                return null;
            });
            if (res4book) {
                ctx.body = {
                    result: 'ok'
                }
            } else {
                ctx.body = {
                    result: 'failed'
                }
            }
        } else {
            ctx.body = {
                result: 'nomoney'
            }
        }
    },
    'POST /buyBook':async(ctx,next)=>{
        var bookPrice = ctx.request.body.price;
        let _bid = ctx.request.header.referer.split("?")[1];
        if (!_bid.startsWith('b-')) {
            _bid = _bid.substring(3);
        }
        //user email
        let _uid = ctx.cookies.get('user');
        if (!_uid) {
            ctx.body = {
                result: 'nologin'
            }
            return;
        }
        //扣除起飞币 返回true or false
        let takeOffRes = await takeOffAccount(_uid, bookPrice);
        _uid = await getUid(_uid);
        if (takeOffRes) {
            //修改用户购买图书的数据
            let now = Date.now();
            let res4book = await CheckBuy.create({
                id: 'B-' + now,
                uid: _uid,
                bid: _bid,
                createdAt: now,
                updatedAt: now,
                version: 0
            }).then(res=>{
                return res;
            }).catch(err=>{
                console.log(err);
                return null;
            });
            if (res4book) {
                ctx.body = {
                    result: 'ok'
                }
            } else {
                ctx.body = {
                    result: 'failed'
                }
            }
        } else {
            ctx.body = {
                result: 'nomoney'
            }
        }
    }
};