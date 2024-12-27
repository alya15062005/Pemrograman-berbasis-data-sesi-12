const mysql = require('mysql2');

// koneksi database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',         
    password: '',        
    database: 'tugas_programan_sesi12'
});

//  database
db.connect((err) => {
    if (err) {
        console.log('Gagal terhubung ke database:', err);
    } else {
        console.log('Berhasil terhubung ke database');
    }
});

module.exports = db;
