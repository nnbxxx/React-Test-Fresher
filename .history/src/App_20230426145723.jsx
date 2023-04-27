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
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading";
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/Admin/admin";
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
    errorElement: <NotFound />,
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
    path: "/admin",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <AdminPage /> },
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
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const getAccount = async () => {
    const res = await callFetchAccount();
    dispatch(doGetAccountAction(res.data.user));
  };
  useEffect(() => {
    setTimeout(() => {
      getAccount();
    }, 1000);
  }, []);
  return (
    <>
      {" "}
      {isAuthenticated || window.location.pathname === "/login" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
      {/*  */}
    </>
  );
}