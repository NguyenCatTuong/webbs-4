const { db } = require('../configs/db')

module.exports = {
    all: async () => {
        const rs = await db.any('SELECT * FROM public."Products"');
        return rs;
    },

    getProductByCategory: async (category) => {
        const rs = await db.any('SELECT * FROM public."Products" AS p INNER JOIN public."Categories" AS c ON p."CategoryID" = c."CategoryID" WHERE c."CategoryName" = $1', [category]);
        return rs;
    },
}