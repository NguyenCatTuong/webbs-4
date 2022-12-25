require('dotenv').config();
const axios = require('axios');
const https = require('https');
const axiosInstance = axios.create({
    baseURL: process.env.AUTH_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

module.exports = axiosInstance;
