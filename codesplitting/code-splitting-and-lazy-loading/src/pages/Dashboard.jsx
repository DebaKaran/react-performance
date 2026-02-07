import { useState } from "react";

import { todosData as todos } from "../datas/todos";

export default function Dashboard() {
  const [todosList, setTodosList] = useState([]);

  return (
    <>
      <h2>Dashboard Page</h2>

      <button onClick={() => setTodosList(todos)}>
        Load Todos
      </button>

      <ul>
        {todosList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}