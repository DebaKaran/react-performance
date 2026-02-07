import { useState } from "react";

export default function Dashboard() {
  const [todosList, setTodosList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clickHandler = () => {
    setLoading(true);
    setError(null);

    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        return response.json();
      })
      .then((data) => {
        setTodosList(data); // limit for demo
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <>
      <h2>Dashboard Page</h2>

      <button onClick={clickHandler} disabled={loading}>
        {loading ? "Loading..." : "Load Todos"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {todosList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}