const User = require('../models/user');
const Book = require('../models/book');

var getUid = async (name) => {
    return await User.findOne({
        where: {
            email: name
        }
    }).then((res) => {
        return res.id;
    });
}

var getBooks = async (_uid) => {
    return await Book.findAll({
        where: {
            uid: _uid
        }
    }).then((res) => {
        let result = [];
        let temp = [];
        for (let i in res) {
            temp.push(res[i].dataValues.id);
            temp.push(res[i].dataValues.bookName);
            result.push(temp);
            temp = [];
        }
        return result;
    });
}

module.exports = {
    'GET /mybook': async (ctx, next) => {
        var user_name = ctx.cookies.get('user');
        if (user_name) {
            var _uid = await getUid(user_name);
            var books = await getBooks(_uid);
            ctx.render('mybook.html', {
                book: books
            })
        } else {
            ctx.render('login.html', {
                title: '登陆'
            })
        }
    }
}