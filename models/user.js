const db = require('../db');

module.exports = db.defineModel('users', {
    id: {
        type: db.STRING(50),
        primaryKey: true
    },
    email: db.STRING(20),
    password: db.STRING(20),
    name: db.STRING(100),
    gender: db.BOOLEAN,
    birth: db.STRING(10),
    author: db.BOOLEAN
});