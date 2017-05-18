// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

// 导入controller middleware:
const controller = require('./controller');

const bodyParser = require('koa-bodyparser');

//模板引擎
const nunjucks = require('nunjucks');

const isProduction = process.env.NODE_ENV === 'production';

const templating = require('./templating');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

//1、log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

//2、处理静态文件
if (!isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

//3、处理post参数
app.use(bodyParser());

//4、给ctx加上render()来使用Nunjucks
//加载view ‘views’放置view的文件夹 加载模板
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

//5、使用middleware:添加controller
app.use(controller());

//监听3000端口
app.listen(3000);
console.log('app started at port 3000...');

// const User = require('./models/user');

// var now = Date.now();

// (async () => {
//     await User.create({
//         id: 'g-' + now,
//         email: 'admin@example.com',
//         password: '123456',
//         name: 'jane',
//         gender: false,
//         birth: '2007-07-07',
//         author: true,
//         createdAt: now,
//         updatedAt: now,
//         version: 0
//     });
// })();