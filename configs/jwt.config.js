const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY;

const encodedToken = async (sub, expire = 7 * 24 * 3600) => {
  return await jwt.sign({ iss: process.env.JWT_ISS, sub }, secretKey, {
    expiresIn: expire,
  });
};

const verifyToken = (token) => jwt.verify(token, secretKey);

module.exports = {
  encodedToken,
  verifyToken,
};
