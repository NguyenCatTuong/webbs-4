const axiosInstance = require("../configs/axiosInstance");
const { hashPassword } = require('../helper/index')
const { getToken } = require('../helper/shop.helper')
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


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

    login: (req, res, next) => {
        if (getToken()) {
            res.redirect('/product')
        } else {
            res.render('signIn')
        }
    },

    postLogin: async (req, res, next) => {
        try {
            const rs = await axiosInstance.post('/login', req.body)
            if (rs.status === 200) {
                const { token } = rs.data;
                localStorage.setItem('accessToken', token);
                localStorage.setItem('username', req.body.username);
                res.redirect('/product')
            }
        } catch (error) {
            res.render('signIn', {
                type: 'danger',
                message: error.response.data.msg
            })
        }
    },

    logOut: async (req, res) => {
        try {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('username');
            return res.redirect('/login');
        } catch (error) {
            console.error('POST LOGOUT ERROR: ', error);
            return res.render('errorPage');
        }
    },
}