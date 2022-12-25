const authRouter = require('./auth.route')
// const {authMiddleware} = require('../middlewares/auth.middleware')
function route(app) {

    app.use('/', authRouter)
    app.get('*', (req, res) => {
        res.render('errorPage', {layout: false})
    })
}

module.exports = route;