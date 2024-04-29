import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:4000/todos";
      const body = { description };
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="container text-center mb-3 font-weight-bold">
        <h2>My Todo List</h2>
      </div>
      <hr />

      <form onSubmit={onSubmitForm}>
        <div className="input-field-parent mt-5">
          <div>
            <input
              id="add"
              type="text"
              name="to-do"
              className="input-field form-control"
              placeholder="Enter a todo..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="add-btn text-right">
            <button className="btn btn-success">Add</button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default InputTodo;
