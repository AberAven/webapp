const Book = require('../models/book');
const db = require('../db')

module.exports = {
    'GET /classification': async(ctx, next) => {
        var type = ctx.request.url.split('?')[1];
        var books = await Book.findAll({
            where:{
                classification:type
            }
        }).then((res)=>{
            return res;
        });
        console.log(books);
        var result = [];
        var temp = [];
        for(var b in books){
            temp.push(books[b].dataValues.id);
            temp.push(books[b].dataValues.bookName);
            temp.push(books[b].dataValues.author);
            result.push(temp);
            temp = [];
        }
        if(books){
            ctx.render('classification.html',{
                title:db.BOOK_TYPES_NAME[type-1],
                type:db.BOOK_TYPES_NAME[type-1],
                book:result
            })
        }else{
            ctx.render('classification.html',{
                type:'UNKNOW',
            })
        }
    }
};