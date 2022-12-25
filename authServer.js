require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');

const key = fs.readFileSync('./ssl/key.pem');
const cert = fs.readFileSync('./ssl/cert.pem');

const app = express();
const server = https.createServer({ key: key, cert: cert }, app);

app.get('/auth', (req, res) => { res.json({'msg': 'success'}) });

server.listen(process.env.PORT_AUTH, () => { console.log(`listening on https://localhost:${process.env.PORT_AUTH}`) });