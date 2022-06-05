import { useState, useRef, useEffect } from "react";
import TodoList from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);
  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  };
  const addTodoHandler = (e) => {
    // const name = todoNameRef.current.value;
    const name = inputValue;
    if (name === "") return;

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
    todoNameRef.current.focus();
  };
  const handleClearTodos = () => {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  };
  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} onInput={(e) => setInputValue(e.target.value)} type="text" />
      <button onClick={addTodoHandler}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed Todo</button>
      <div>{todos.filter((todo) => !todo.complete).length} left Todo</div>
    </>
  );
}

export default App;
