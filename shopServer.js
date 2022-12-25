const { default: axios } = require('axios');
const express = require('express')
const { engine } = require('express-handlebars');
const path = require('path');
const https = require('https');
const axiosInstance = require('./configs/axiosInstance');
const route = require('./routes/index.shop.route');
const { verifyToken } = require('./configs/jwt.config');
const { getToken } = require('./helper/shop.helper');
const session = require('express-session');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

require('dotenv').config()

const port = process.env.PORT_SHOP;
const app = express()

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// session
app.use(
	session({
		secret: process.env.SESSION_SECRET || 'secret',
		resave: false,
		saveUninitialized: true,
	}),
);

app.use((req, res, next) => {
	res.locals.currentUser = localStorage.getItem('username');
	next()
})

// Static file
app.use(express.static(path.join(__dirname, 'public')));

// Template engine
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, './views'));

// route
route(app);
app.get('/shop', async (req, res) => {
    const rs = await axiosInstance.get('/auth')
    res.json(rs.data)
});


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
