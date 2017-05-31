const db = require('../db');

module.exports = db.defineModel('buyeds', {
    id: {
        type: db.STRING(50),
        primaryKey: true
    },
    uid: db.STRING(50),
    bid: db.STRING(100)
});