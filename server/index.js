//creating modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

//connect to the database
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database:"bookrack"
});

/*app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO books (bookName, author, category) VALUES ('Harry Potter', 'hsdgf', 'tranlation')";
    db.query(sqlInsert, (err, result) =>{
        res.send("data inserted");

    });
});*/

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

//selecting books
app.get("/api/get", (req,res) => {

    const sqlSelect = "SELECT * FROM books";
    
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

//adding books
app.post("/api/insert", (req, res) => {
    
    const bookName = req.body.bookName
    const author = req.body.author
    const category = req.body.category
    
    const sqlInsert = "INSERT INTO books (bookName, author, category) VALUES (?,?,?)";
    
    db.query(sqlInsert, [bookName, author, category], (err, result) => {
        console.log(result);
    });
});

//deleting a book
app.delete('/api/delete/:id', (req, res) => { //give variable name to path
    const id = req.params.id;  //use params because of variable

    const sqlDelete = "DELETE FROM books where id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if (err){
             console.log(err);
            } else {
                res.send(result);
            }
    });
});

//updating a book
app.put("/api/update", (req, res) => { //give variable name to path
    const id = req.body.id;
    const bookName = req.body.bookName;  
    const author = req.body.author;
    const category = req.body.category;

    const sqlUpdate = "UPDATE books SET bookName = ?, author = ?, category = ? WHERE id= ?";
    db.query(sqlUpdate, [bookName, author, category, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3003, () => {
    console.log("It's running on port 3003");
});