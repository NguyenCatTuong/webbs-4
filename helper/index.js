const bcrypt = require('bcryptjs');
require('dotenv').config()

async function hashPassword(password = '') {
    const saltRounds = parseInt(process.env.SALT_ROUND || 10);
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
}

module.exports = hashPassword;