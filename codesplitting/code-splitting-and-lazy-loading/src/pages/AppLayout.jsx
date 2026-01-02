import { Link, Outlet } from "react-router-dom";
import { Suspense } from "react";

export default function AppLayout() {
  return (
    <>
       <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link>
       </nav>

      <Suspense fallback={<h3>Loading page...</h3>}>
        <Outlet />
      </Suspense>
    </>
  );
}
