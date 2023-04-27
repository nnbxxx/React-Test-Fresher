import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import LoginPage from "./pages/login";
import Contact from "./pages/Contact";
import BookPage from "./pages/Book";
import Home from "./components/Home";
import RegisterPage from "./pages/register";
import { callFetchAccount } from "./service/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading";
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/Admin/admin";
import ProtectedRoute from "./components/ProtectedRoute";
const LayoutUser = () => {
  return (
    <div className='layout-app'>
      <div>Header</div>
      <Outlet />
      <div> footer</div>
    </div>
  );
};
const LayoutAdmin = () => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  const isPermmited = isAdminRoute && user.role === "ADMIN";
  return (
    <div className='layout-app'>
      {isPermmited && <div>Header Admin</div>}
      <Outlet />
      {isPermmited && <div>Footer Admin</div>}
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutUser />,
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
    element: <LayoutAdmin />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <AdminPage />{" "}
          </ProtectedRoute>
        ),
      },
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
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/"
    ) {
      return;
    }
    const res = await callFetchAccount();
    if (res.data) dispatch(doGetAccountAction(res.data.user));
  };
  useEffect(() => {
    setTimeout(() => {
      getAccount();
    }, 1000);
  }, []);
  return (
    <>
      {" "}
      {isAuthenticated ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
      {/*  */}
    </>
  );
}
