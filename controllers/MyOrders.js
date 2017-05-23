const COrder = require('../models/order');
const User = require('../models/user');
const axios = require('axios');

var getUid = async (name) => {
    return await User.findOne({
        where: {
            email: name
        }
    }).then(res => {
        return res.id;
    }).catch(err => {
        console.log(err);
        return null;
    });
}

var getOid = async (id) => {
    return await COrder.findOne({
        where: {
            uid: id
        }
    }).then(res => {
        return res;
    }).catch(err => {
        console.log(err);
        return err;
    });
}

function getLocalTime(nS) {  
 return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');  
}

module.exports = {
    'GET /myorder': async (ctx, next) => {
        let name = ctx.cookies.get('user');
        var _uid = await getUid(name);
        if (!_uid) {
            ctx.body = '<h1>请先登陆</h1>';
            return;
        }
        var _oid = await getOid(_uid);
        if (!_oid) {
            ctx.render('myorder.html', {
                ordertitle: '暂时还未有订单'
            });
            return;
        }
        var result = await axios.post('http://localhost:3001/api/getOrder', {
            id: _uid
        }).then(res => {
            if (res.data.result.code != 200)
                return null;
            let temp = [];
            let result = [];
            for (var i in res.data.result.data) {
                temp.push(res.data.result.data[i].id);
                temp.push(res.data.result.data[i].amount);
                temp.push(res.data.result.data[i].paytype);
                var d = new Date(Number(res.data.result.data[i].createdAt)).toLocaleString();
                temp.push(d);
                result.push(temp);
                temp = [];
            }
            return result;
        }).catch(err => {
            console.log(err);
            return null;
        });
        if (result) {
            ctx.render('myorder.html', {
                ordertitle: '我的订单',
                orders: result
            });
        } else {
            //请求失败
            ctx.render('myorder.html', {
                ordertitle: '暂时还未有订单'
            });
        }
    }
}