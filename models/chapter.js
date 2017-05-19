const db = require('../db');

module.exports = db.defineModel('chapters', {
    id: {
        type: db.STRING(50),
        primaryKey: true
    },
    bid: db.STRING(50),
    chapterNumber: db.STRING(50),
    chapterName: db.STRING(100)
});
