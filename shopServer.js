const { default: axios } = require('axios');
const express = require('express')
const { engine } = require('express-handlebars');
const path = require('path');
const https = require('https');
const axiosInstance = require('./configs/axiosInstance');
// const route = require('./routes');
// const { db, connect } = require('./configs/db');

require('dotenv').config()

const port = process.env.PORT_SHOP;
const app = express()

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Static file
app.use(express.static(path.join(__dirname, 'public')));

// Template engine
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, './views'));

//route
// route(app);
app.get('/shop', async (req, res) => {
    const rs = await axiosInstance.get('/auth')
    res.json(rs.data)
});

//Db
// connect();

//test db
// db.any('SELECT * FROM users')
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => console.log(err)
//   )

// db.oneOrNone('INSERT INTO users (pass) VALUES ($1) RETURNING *', ['hihi2'])
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => console.log(err)
//   )


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
