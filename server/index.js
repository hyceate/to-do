const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { Query } = require("pg");

//middleware
app.use(cors());
app.use(express.json());

//Routes
//create a todo
app.post("/todos", async(req,res) => {
    try {   
        const query = "INSERT INTO todo(description) VALUES ($1) RETURNING *";
        const { description } = req.body
        const newTodo = await pool.query(query,[description]);

        res.json(newTodo.rows[0]);

    } catch (err) {
      console.log(err.message);
    }
});


//get all todos
app.get("/todos", async(req,res) => {
    try{
        const query = "SELECT * FROM todo"
        const allTodos = await pool.query(query,);

        res.json(allTodos.rows);

    } catch (err) {
        console.log(err.message);
    }
});


//get a todo
app.get("/todos/:id", async(req,res) => {
    try {
        const query = "SELECT * FROM todo WHERE todo_id = $1";
        const { id } = req.params; 
        const todo = await  pool.query(query, [id]);

        res.json(todo.rows[0]);

    } catch (err) {
        console.log(err.message);    
    }
});


//update a todo
app.put("/todos/:id", async(req,res) => {
    try {
        const query = "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *";
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(query, 
        [description, id]
        );

        res.json(updateTodo.rows[0]);

    } catch (err) {
        console.log(err.message);
    }
});

//delete a todo
app.delete("/todos/:id", async(req,res) => {
    try {
        const query = "DELETE FROM todo WHERE todo_id = $1";
        const { id } = req.params;
        const deleteTodo = await pool.query(query, 
        [ id ]
        );

        res.json("To-do was deleted");

    } catch (err) {
        console.log(err.message);
    }
});


app.listen(4000, () => {
    console.log("server has started on port 4000");
});