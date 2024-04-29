import React, { Fragment, useEffect, useState } from "react";
import EditToDo from "./EditToDo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  //delete todo
  const deleteTodo = async (id) => {
    try {
      const deteleTodo = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  //gets all todos function
  const getToDos = async () => {
    try {
      const url = "http://localhost:4000/todos";
      const response = await fetch(url);
      const jsonData = await response.json(response);

      //console.log(jsonData)
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //useEffect
  useEffect(() => {
    getToDos();
  }, []);

  return (
    <Fragment>
      <hr />
      <table id="todos">
        <colgroup>
          <col style={{ width: "97%" }} />
          <col />
          <col />
        </colgroup>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditToDo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => deleteTodo(todo.todo_id)}
                >
                  {" "}
                  Delete{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodo;
