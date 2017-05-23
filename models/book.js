const db = require('../db');

module.exports = db.defineModel('books', {
    id: {
        type: db.STRING(50),
        primaryKey: true
    },
    uid:db.STRING(50),
    bookName :db.STRING(100),
    chapterId:db.STRING(50),
    author:db.STRING(20),
    votes:db.BIGINT,
    classification:db.INTEGER
});