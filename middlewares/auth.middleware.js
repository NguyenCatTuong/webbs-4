const User = require('../models/user.model');

exports.authMiddleware = async (req, res, next) => {
	if (req.session.user) {
		return next();
	}

	// if remember me (logged in user)
	const { un } = req.signedCookies;

	// if cookie not found -> redirect login
	if (!un) return res.redirect('/login');

	try {
		// check user in database
		const user = await User.getUser(un);

		// if cookie un invalid -> redirect login
		if (!user) return res.redirect('/login');

		// else next
		req.session.user = { username: un, userId : user.id };
		next();
	} catch (error) {
		console.log('AUTH ERROR: ', error);
		return res.render('404');
	}
};
