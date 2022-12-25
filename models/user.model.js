const { db } = require('../configs/db')

module.exports = {
    all: async () => {
        const rs = await db.any('SELECT * FROM public."Users"');
        return rs;
    },

    getGreatestUserID: async () => {
        const rs = await db.oneOrNone('SELECT "UserID" FROM public."Users" ORDER BY "UserID" DESC LIMIT 1');
        console.log(rs);
        return rs;
    },

    add: async (user) => {
        const rs = await db.one('INSERT INTO public."Users"("UserID", "Username", "Password", "FullName", "Address") VALUES($1, $2, $3, $4, $5) RETURNING *', [user.id, user.username, user.pass, user.fullname, user.address]);
        return rs;
    },

    getUser: async (username) => {
        const user = await db.oneOrNone('SELECT * FROM public."Users" WHERE "Username" = $1', [username])
        return user;
    },
}