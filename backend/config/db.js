const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

console.log('🔄 Connecting to Railway MySQL...');
console.log('🔍 Checking environment variables:');
console.log('- DB_HOST:', process.env.DB_HOST ? '✅ Set' : '❌ Missing');
console.log('- DB_PORT:', process.env.DB_PORT ? '✅ Set' : '❌ Missing');
console.log('- DB_USER:', process.env.DB_USER ? '✅ Set' : '❌ Missing');
console.log('- DB_PASSWORD:', process.env.DB_PASSWORD ? '✅ Set' : '❌ Missing');
console.log('- DB_NAME:', process.env.DB_NAME ? '✅ Set' : '❌ Missing');

// Also check MYSQL variables
console.log('🔍 MYSQL variables:');
console.log('- MYSQLHOST:', process.env.MYSQLHOST ? '✅ Set' : '❌ Missing');
console.log('- MYSQLPORT:', process.env.MYSQLPORT ? '✅ Set' : '❌ Missing');

const pool = mysql.createPool({
    host: process.env.DB_HOST || process.env.MYSQLHOST,
    port: process.env.DB_PORT || process.env.MYSQLPORT,
    user: process.env.DB_USER || process.env.MYSQLUSER,
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
    database: process.env.DB_NAME || process.env.MYSQLDATABASE,
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
        connection.release();
    })
    .catch(err => {
        console.error('❌ Database connection failed:');
        console.error('Error code:', err.code);
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
    });

module.exports = promisePool;