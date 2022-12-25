const axiosInstance = require("../configs/axiosInstance");

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
        res.render('signIn')
    },

    postLogin: async (req, res, next) => {
        try {
            const rs = await axiosInstance.get('/login', {data : req.body})
            console.log(rs.data.msg);
            if(rs.data.msg === 'success'){ 
                res.redirect('/shop')
            } else {
                res.render('signIn', {
                    type: 'danger',
                    message: rs.data.msg
                })
            }
        } catch (error) {
            next(error);
        }
    }
}