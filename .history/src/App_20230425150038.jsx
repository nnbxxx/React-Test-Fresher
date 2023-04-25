import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 not found</div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
const Layout = () => {
  return (
    <>
      <RouterProvider router={router} />
      {/* <Layout /> */}
    </>
  );
};
export default function App() {
  return <>apps</>;
}
