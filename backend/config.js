const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    server: 'FRODE-LAPTOP\\SQLEXPRESS',
    database: 'BookHub',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
}

sql.connect(config)
.catch(err => console.log(err));

module.exports = sql;