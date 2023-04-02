import express, { query } from 'express'
import mysql from "mysql2"
import cors from "cors"


const app = express()

app.use(express.json())
app.use(cors())

//db connection
const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: 'password123',
    database: "test",
})

//how to reach backend server
app.get("/",(req, res) => {
    res.json('hello this is the backend')
})

//If there is an authentication problem
//ALTER USER 'root@localhost' IDENTIFIED WITH mysql_native_password BY 'your-password';

//read
app.get("/books",(req,res) => {
    const q = "SELECT * FROM books"
    db.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

// create book
app.post("/books",(req,res) => {
    const q = 'INSERT INTO books (`title`, `desc`,`writer`, `price`,`cover`) VALUES (?)'
    const values = [
        req.body.title,
        req.body.desc,
        req.body.writer,
        req.body.price,
        req.body.cover,
    ]

    db.query(q,[values], (err, data) => {
        if(err) return res.json(err)
        return res.json("book has been created successfully")
    })
});


//delete
app.delete("/books/:id",(req,res)=> {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q,[bookId], (err, data) => {
        if(err) return res.json(err)
        return res.json("book has been deleted successfully")
    })
})


//update
app.put("/books/:id",(req,res)=> {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc`=?, `writer`=?, `price`=?, `cover` = ? WHERE id = ?"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.writer,
        req.body.price,
        req.body.cover,
    ]

    db.query(q,[...values,bookId], (err, data) => {
        if(err) return res.json(err)
        return res.json("book has been updated successfully")
    })
})


app.listen(8800, () => {
    console.log('Connected to backend')
})









//This is how we are making a backend request using express server
/*
import express from 'express'
import mysql from "mysql"


const app = express()

//db connection
const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: 'password123',
    database: "test",
})

//how to reach backend server
app.get("/",(req, res) => {
    res.json('hello this is the backend')
})

app.listen(8800, () => {
    console.log('Connected to backend')
})



//not open browser and run - localhost:8800  -enter
 */

/*
 cd foldername 
 npm init -y

 yarn add express mysql nodemon

 node index.js- will show on terminal the backend is running

 "description": "",
  "main": "index.js",
  "type": "module",

  "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
*/
