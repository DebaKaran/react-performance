import { useState } from "react";

export default function Dashboard() {
  const [todosList, setTodosList] = useState([]);

  const handleOnClick = async () => {
    // Simulate a delay to fetch data
    const module = await import("../datas/todos");
    setTodosList(module.todosData);
  }
  return (
    <>
      <h2>Dashboard Page</h2>

      <button onClick={handleOnClick}>
        Load Todos (Lazy)
      </button>

      <ul>
        {todosList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}