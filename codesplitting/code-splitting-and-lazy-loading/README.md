## Code Splitting:

Route-Based Code Splitting (React Router v6)

This project implements route-based code splitting to reduce the initial JavaScript bundle size and improve page load performance.

## Why Code Splitting

In a traditional React Router setup, all route components are statically imported and bundled into a single JavaScript file. As the application grows, this increases the initial load time even if users never visit certain routes.

Route-based code splitting ensures that only the code for the active route is loaded, while other routes are fetched on demand.

## Implementation Details

1: Route components are loaded using React.lazy()

2: A Suspense boundary is used to handle async loading states

3: Each route is bundled into a separate JavaScript chunk during production build

## Code Example

import { Routes, Route, Link } from "react-router-dom";
import React, { Suspense } from "react";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Suspense fallback={<h3>Loading...</h3>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </div>
  );
}


## Production Build Output

Running the production build: npm run build

Generates multiple JavaScript chunks:

dist/
 ├─ index.html
 └─ assets/
     ├─ index-[hash].js        // app shell & router
     ├─ Home-[hash].js         // home route
     ├─ Login-[hash].js        // login route
     └─ Dashboard-[hash].js    // dashboard route

Each route chunk is loaded only when its route is rendered.

## Performance Benefits:

1: Smaller initial JavaScript payload

2: Faster First Contentful Paint (FCP)

3: Reduced unused code download

4: Better scalability as routes grow

--

## Per-Route Suspense for Better Navigation UX

This project uses per-route Suspense boundaries instead of a single global boundary to improve user experience during route navigation.

## Why Not Global Suspense?

Wrapping all routes with a single Suspense boundary causes the entire page to re-render the fallback UI whenever a lazy-loaded route is fetched.

This can:

1: Hide persistent UI like navigation bars

2: Feel like a full page reload

3: Negatively impact perceived performance

## Per-Route Suspense Approach

Each route is wrapped in its own Suspense boundary, ensuring that only the route content area displays a loading state while shared layout remains visible.

## Implementation Example

<Routes>
  <Route
    path="/"
    element={
      <Suspense fallback={<h3>Loading Home...</h3>}>
        <Home />
      </Suspense>
    }
  />
  <Route
    path="/login"
    element={
      <Suspense fallback={<h3>Loading Login...</h3>}>
        <Login />
      </Suspense>
    }
  />
  <Route
    path="/dashboard"
    element={
      <Suspense fallback={<h3>Loading Dashboard...</h3>}>
        <Dashboard />
      </Suspense>
    }
  />
</Routes>


## Benefits

1: Prevents full-page loading flashes during navigation

2: Keeps shared UI (navigation, layout) mounted

3: Improves perceived performance and LCP

4: Scales better as routes grow