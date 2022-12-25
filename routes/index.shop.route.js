const userRouter = require('./user.route')
const productRouter = require('./product.route')
// const {authMiddleware} = require('../middlewares/auth.middleware')
function route(app) {

    app.use('/', userRouter)
    app.use('/product', productRouter)
    app.get('*', (req, res) => {
        res.render('errorPage', {layout: false})
    })
}

module.exports = route;