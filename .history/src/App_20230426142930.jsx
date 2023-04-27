import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import LoginPage from "./pages/login";
import Contact from "./pages/Contact";
import BookPage from "./pages/Book";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterPage from "./pages/register";
import { callFetchAccount } from "./service/api";
import { useDispatch } from "react-redux";
const Layout = () => {
  return (
    <div className='layout-app'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404 not found</div>,
    children: [
      { index: true, element: <Home /> },
      {
        path: "contacts",
        element: <Contact />,
      },
      {
        path: "book",
        element: <BookPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
export default function App() {
  const dispatch = useDispatch();
  const getAccount = async () => {
    const res = await callFetchAccount();

    // dispatch(doGetAccountAction(res.data.user));
    console.log("🚀 ~ file: App.jsx:49 ~ getAccount ~ res:", res);
  };
  useEffect(() => {
    getAccount();
  }, []);
  return (
    <>
      {" "}
      <RouterProvider router={router} />
    </>
  );
}
