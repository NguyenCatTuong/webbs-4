const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

function getToken() {
    return localStorage.getItem('accessToken');

}

module.exports = { getToken }