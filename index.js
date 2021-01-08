const express = require('express');
const mysql = require('mysql');


// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Strongpwd101',
    database: 'nodemysql'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;  
    }
    console.log('MySQL Connected...');
})

const app = express();

app.get('/', (req,res) => {
    res.send('Hello!');
})

// Create DB
app.get('/createdb', (req,res) => {
    const dbName = 'nodemysql';
    let sql = `CREATE DATABASE ${dbName}`;

    db.query(sql, (err, result) => {
        if(err){
            res.send(err.sqlMessage);
        };
        console.log(result);
        res.send(`Database ${dbName} Created`)
    });
})

// Create table
app.get('/createposttable', (req,res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), body VARCHAR(255))';
    db.query(sql, (err,result) => {
        if(err) throw err.sqlMessage;
        console.log(result);
        res.send('Posts table created...');
    })
})

// Insert post 1
app.get('/addpost1', (req, res) => {
    let post = {title: 'Post One', body: 'This is post number one'};
    let sql = 'INSERT INTO posts SET ?';
    db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post one added...');
    })
})

app.listen('4000', () => {
    console.log(`Server started on http://localhost:4000`);
})