import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import axios from "axios";

function Form({ data, onTodoAdd }) {
  const [formState, setFormState] = useState({
    id: "",
    title: "",
    author: "",
  });

  // optimistic UI in action here
  const handleSubmit = async (e) => {
    e.preventDefault();
    const uuid = v4();
    setFormState({ ...formState, id: uuid });
    console.log(formState);
    const data = JSON.stringify(formState);
    // if you want you can make API calls here
    try {
      onTodoAdd(formState);
      await postData(data);
    } catch (err) {
      console.log(err);
      onTodoAdd(data);
    }
  };

  const postData = async (data) => {
    const res = await axios({
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      url: "http://localhost:3000/todos",
      data: data,
    });
    console.log(res);
  };

  const handleChange = (e) => {
    console.log("ran");
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="column is-5 mx-5">
      <form className="field" onSubmit={handleSubmit}>
        <label className="label">Todo Item</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Text input"
            value={formState.title}
            id="title"
            name="title"
            onChange={handleChange}
          />
        </div>
        <label className="label">Author</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="author"
            id="author"
            name="author"
            value={formState.author}
            onChange={handleChange}
          />
        </div>
        <div className="control my-3">
          <button className="button is-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
