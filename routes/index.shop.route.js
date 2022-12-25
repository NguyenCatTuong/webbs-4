const userRouter = require('./user.route')
// const {authMiddleware} = require('../middlewares/auth.middleware')
function route(app) {

    app.use('/', userRouter)
    app.get('*', (req, res) => {
        res.render('errorPage', {layout: false})
    })
}

module.exports = route;