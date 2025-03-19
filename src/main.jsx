import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchPage from "./pages/SearchPage.jsx";
import OLPage from "./pages/OLPage.jsx";

const router = createBrowserRouter([
  { path: "/", Component: App },
  { path: "/search", Component: SearchPage },
  { path: "/olpage", Component: OLPage },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
