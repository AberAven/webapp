const db = require('../db');

module.exports = db.defineModel('client_orders', {
    id: {
        type: db.STRING(50),
        primaryKey: true
    },
    uid: db.STRING(50),
    oid: db.STRING(100)
});