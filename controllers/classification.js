module.exports = {
    'POST /classification': async(ctx, next) => {
        console.log(ctx.request.body.bookId);
    }
};