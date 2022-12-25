const { db } = require('../configs/db')

module.exports = {
    getCategoryName: async () => {
        const rs = await db.any('SELECT "CategoryName" FROM public."Categories"');
        return rs;
    },
}