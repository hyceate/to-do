const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { Query } = require("pg");

//middleware
app.use(cors());
app.use(express.json());

const resetIdSequence = async () => {
  try {
    const todoCount = await pool.query("SELECT COUNT(*) FROM todo");
    if (todoCount.rows[0].count === "0") {
      await pool.query("ALTER SEQUENCE todo_id RESTART WITH 1"); // Adjust 'todo_id_seq' if your sequence name is different
      console.log("ID sequence reset to 1");
    }
  } catch (err) {
    console.error("Error resetting ID sequence:", err.message);
  }
};


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
app.get("/todos", async (req, res) => {
    try {
      const query = "SELECT * FROM todo";
      const allTodos = await pool.query(query);
      res.json(allTodos.rows);
    } catch (err) {
      console.error("Error getting all tasks:", err.message);
      res.status(500).json({ message: "Error getting tasks" });
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
app.post("/todos", async (req, res) => {
    try {
      const { description } = req.body;
      const query = "INSERT INTO todo(description) VALUES ($1) RETURNING *";
      const newTodo = await pool.query(query, [description]);
      res.json(newTodo.rows[0]);
    } catch (err) {
      console.error("Error creating todo:", err.message);
      res.status(500).json({ message: "Error creating todo" });
    }
  });

//delete a todo
app.delete("/todos/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const query = "DELETE FROM todo WHERE todo_id = $1 RETURNING *";
        const deleteTodo = await pool.query(query, [ id ]);
        if (deleteTodo.rows.length === 0) {
            res.status(404).json({ message: "Task not found" });
          } else {
            res.json("Task was deleted");
            await resetIdSequence(); // Call resetIdSequence after deletion
          }

    } catch (err) {
        console.log(err.message);
    }
});


app.listen(4000, () => {
    console.log("server has started on port 4000");
});