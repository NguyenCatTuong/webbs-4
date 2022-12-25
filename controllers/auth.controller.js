const userModel = require('../models/user.model')
const hashPassword = require('../helper/index')

module.exports = {
    signUp: async (req, res, next) => {
        const isUserIdExist = await userModel.getGreatestUserID()
        res.render('signUp')
    },

    postSignUp: async (req, res, next) => {
        console.log(req.body);
        const { username, fullname, address, pass, rePass } = req.body;
        const isExist = await userModel.getUser(username)
        if (Boolean(isExist)) {
            res.render('signUp', {
                type: 'danger',
                message: 'Username đã tồn tại!'
            })
        } else
            if (pass !== rePass) {
                res.render('signUp', {
                    type: 'danger',
                    message: 'Mật khẩu không trùng khớp'
                })
            } else {
                const isUserIdExist = await userModel.getGreatestUserID()
                const newId = isUserIdExist?.UserID + 1 || 1;
                const hashPass = await hashPassword(pass)
                await userModel.add({ id: newId, username, pass: hashPass, fullname, address })
                res.redirect('http://localhost:18644/shop');
            }
    },

    login: (req, res, next) => {
        res.render('signIn')
    },

    postLogin: async (req, res, next) => {
        const { username, pass, isRemember } = req.body;
        const user = await userModel.getUser(username)
        const isMatch = await bcrypt.compare(pass, user?.pass || '');

        if (user?.username === username && isMatch) {
            req.session.user = {
                username: username,
                userId: user.id,
            };
            if (isRemember) {
                res.cookie('un', user.f_Username, {
                    signed: true,
                    httpOnly: true,
                    maxAge: 86400 * 1000,
                });
            }
            res.redirect('/')
        } else {
            res.render('signIn', {
                message: 'Tài khoản hoặc mật khẩu không đúng!',
                type: 'danger'
            })
        }
    }
}