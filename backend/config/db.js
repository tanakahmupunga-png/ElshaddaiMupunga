const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

console.log('🔄 Connecting to Railway MySQL...');
console.log('📊 Using MySQL environment variables:');

const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    port: parseInt(process.env.MYSQLPORT),
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE, // Note: might be MYSQL_DATABASE or MYSQLDATABASE
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    }
});

const promisePool = pool.promise();

// Test connection
promisePool.getConnection()
    .then(connection => {
        console.log('✅ Database connected successfully!');
        console.log('📊 Connected to database:', connection.config.database);
        console.log('📊 Connected to host:', connection.config.host);
        connection.release();
    })
    .catch(err => {
        console.error('❌ Database connection failed:');
        console.error('Error code:', err.code);
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
    });

module.exports = promisePool;