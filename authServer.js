require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');
const { engine } = require('express-handlebars');
const path = require('path');
const { db, connect } = require('./configs/db');
const route = require('./routes');

const key = fs.readFileSync('./ssl/key.pem');
const cert = fs.readFileSync('./ssl/cert.pem');

const app = express();
const server = https.createServer({ key: key, cert: cert }, app);

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

// Route
route(app);
// app.get('/signup', (req, res) => {
//     res.render('signUp');
// })
// app.get('/auth', (req, res) => { res.json({ 'msg': 'success' }) });

//Db
connect();
// db.any('SELECT * FROM public."Users"')
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => console.log(err)
//   )

server.listen(process.env.PORT_AUTH, () => { console.log(`listening on https://localhost:${process.env.PORT_AUTH}`) });