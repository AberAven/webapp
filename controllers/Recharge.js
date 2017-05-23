const User = require('../models/user');
const axios = require('axios');
const COrder = require('../models/order');

var getUidAndAccount = async (email) => {
    return await User.findOne({
        where: {
            email: email
        }
    }).then((res) => {
        return {
            uid: res.id,
            account: res.account
        }
    }).catch((err) => {
        console.log(err);
        return null;
    })
}

var insertOrder = async (uid, oid) => {
    let now = Date.now();
    return await COrder.create({
        id: 'co-' + now,
        uid: uid,
        oid, oid,
        createdAt: now,
        updatedAt: now,
        version: 0
    }).then((res) => {
        return res;
    }).catch((err) => {
        console.log(err);
        return null;
    });
}

module.exports = {
    'GET /recharge': async (ctx, next) => {
        ctx.render('recharge.html');
    },
    'POST /recharge': async (ctx, next) => {
        let coo = ctx.cookies.get('user');
        if (!coo) {
            ctx.body = {
                result: 'nologin'
            };
            return;
        }
        let amount = ctx.request.body.amount;
        let payType = ctx.request.body.pay_type;
        //获取用户id和账户余额
        var uidAccount = await getUidAndAccount(coo);
        if (!uidAccount) {
            ctx.body = {
                result: 'nologin'
            };
            return;
        }
        let charge_tag = await axios.post('http://localhost:3001/api/addOrder', {
            uid: uidAccount.uid,
            amount: amount,
            paytype: payType
        }).then((res) => {
            return res.data.result;
        }).catch((err) => {
            return null;
        });
        console.log(charge_tag);
        if (charge_tag && charge_tag.code == 200) {
            let insert_result = await insertOrder(uidAccount.uid, charge_tag.id);
            if(!insert_result){
                console.log('本地订单插入失败');
                 ctx.body = {
                    result: 'failed'
                }
                return;
            }
            let now = Date.now();
            let result = await User.update({
                account: Number(uidAccount.account) + Number(amount),
                updatedAt: now
            }, {
                    where: {
                        id: uidAccount.uid
                    }
                }).then((res) => {
                    return res;
                });
            if (result) {
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
                result: 'failed'
            }
        }
    }
}
