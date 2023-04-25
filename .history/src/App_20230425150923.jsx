import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import Contact from "./pages/Contact";
const Layout = () => {
  return <>main page</>;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404 not found</div>,
    children: [
      {
        path: "contacts",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default function App() {
  return (
    <>
      {" "}
      <RouterProvider router={router} />
    </>
  );
}
