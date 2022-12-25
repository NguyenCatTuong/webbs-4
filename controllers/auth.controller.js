const userModel = require('../models/user.model')
const hashPassword = require('../helper/index')
const bcrypt = require('bcryptjs');

module.exports = {
    signUp: async (req, res, next) => {
        const isUserIdExist = await userModel.getGreatestUserID()
        res.render('signUp')
    },

    postSignUp: async (req, res, next) => {
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

    login: async (req, res, next) => {
        const { username, pass, isRemember } = req.body;
        const user = await userModel.getUser(username)
        const isMatch = await bcrypt.compare(pass, user?.Password || '');
        if (user?.Username === username && isMatch) {
            req.session = {
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
            res.json({"msg" : "success"});
        } else {
            res.json({"msg" : "Tài khoản hoặc mật khẩu không đúng   "});
        }
    }
}