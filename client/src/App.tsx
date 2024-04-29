import './App.css'
//components
import InputToDo from "./components/InputToDo";
import ListToDo from "./components/ListToDo";
import Footer from "./components/Footer"
function App() {

  return (
    <>
       <div id="top-level-div" className="h-100">
        <InputToDo />
        <h3 style={{ margin: "0%", marginTop: "40px" }}>Tasks</h3>
        <div table="todo-table-div">
          <ListToDo />
          <hr color="grey" />
        </div>
      </div>
      <Footer /> 
    </>
  )
}

export default App
