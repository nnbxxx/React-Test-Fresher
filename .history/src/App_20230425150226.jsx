import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404 not found</div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
const Layout = () => {
  return <>main page</>;
};
export default function App() {
  return (
    <>
      {" "}
      <RouterProvider router={router} />
    </>
  );
}
