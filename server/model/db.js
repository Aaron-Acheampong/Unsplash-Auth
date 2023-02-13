//import sqlite3 from "sqlite3";
import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize('splash-db', 'user', 'pass', {
    dialect: 'sqlite',
    host: './model/splash.sqlite',
});
// export const db = new sqlite3.Database(`./splash.sqlite3`, sqlite3.OPEN_READWRITE, (err) => {
//     if (err) return console.error(err.message);

//     console.log("Connection Successful!!");
// });

// //db.run(`CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT UNIQUE)`);
// //db.run(`SELECT * FROM users`);
// //db.run(`CREATE TABLE posts(id INTEGER PRIMARY KEY AUTOINCREMENT, desc TEXT, imgurl TEXT, date DATETIME, uid INTEGER, FOREIGN KEY (uid) REFERENCES users(id))`);


// db.close((err) => {
//     if (err)
//         return console.error(err.message);
// });

// //module.exports = db;
