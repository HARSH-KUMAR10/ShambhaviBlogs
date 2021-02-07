const mysql = require('mysql');

var pool = mysql.createPool({
    host:'db4free.net',port:3306,
    user:'myblogs',password:'myblogs123',
    database:'myblogs_hk',connectionLimit:100,
    multipleStatements:true
});

module.exports = pool;