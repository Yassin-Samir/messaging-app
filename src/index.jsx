import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./App";
import ReactDOM from "react-dom/client";
import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<div className="spinner big"></div>}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
