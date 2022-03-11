import { useState, useEffect } from "react";
import Form from "./Form";
import TodoItems from "./TodoItems";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/todos").then((res) => {
      console.log(res.data);
      setTodos(res.data);
    });
  }, []);

  // optimistic UI is in action here
  const handleDelete = async (e, id) => {
    // this method is an immutable method which means => original array
    // will not be affected
    try {
      let _todos = todos.filter((el) => el.id !== id);
      setTodos(_todos);
      await axios.delete(`http://localhost:3000/todos/${id}`);
    } catch (error) {
      setTimeout(() => {
        let _todos = [...todos];
        setTodos(_todos);
      }, 1000);
    }
    // delete the todos from db
  };

  const handleTodoAdd = (data) => {
    const _todos = [...todos];
    _todos.push(data);
    setTodos(_todos);
  };

  return (
    <div className="app">
      <h1 className="is-size-1 has-text-centered">To Do App</h1>
      <div className="columns is-flex is-justify-content-center">
        <Form data={todos} onTodoAdd={handleTodoAdd} />
        <TodoItems data={todos} onDelete={handleDelete} />
        {/* .... */}
      </div>
    </div>
  );
}

export default App;
