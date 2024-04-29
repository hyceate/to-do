import React, { Fragment } from "react";
import './App.css'
//components
import InputToDo from "./components/InputToDo";
import ListToDo from "./components/ListToDo";
function App() {

  return (
    <Fragment>
      { <div id="top-level-div">
        <InputToDo />
        <h3 style={{ margin: "0%", marginTop: "40px" }}>Tasks</h3>

        <div table="todo-table-div">
          <ListToDo />
          <hr color="grey" />
          <p style={{ font: "small" }} f>
            &copy; Develop Yourself
          </p>
        </div>
      </div> }
    </Fragment>
  )
}

export default App
