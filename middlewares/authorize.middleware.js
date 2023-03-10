const { verifyToken } = require('~/configs/jwt.config');

exports.authorization = (req, res, next) => {
  if (req.isWhitelist) next();
  else {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw new Error('Authorization header not found !');

      const token = authorization.replace('Horse ', '');
      const decoded = verifyToken(token);
      if (decoded) {
        /** accountId, userId, email, verified */
        req.user = decoded.sub;
        next();
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log('Authorization Error: ', error);
      return res
        .status(401)
        .json({ message: 'Unauthorized - Token invalid or expired' });
    }
  }
};
