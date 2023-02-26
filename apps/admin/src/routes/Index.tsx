import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spin } from "antd";
import { RouteEnums } from "./routes.model";
import Loader from "../components/Loader/Index";
const EditBlog = lazy(() => import("../pages/Blogs/Edit"));
const Blog = lazy(() => import("../pages/Blogs/Blog"));
const Users = lazy(() => import("../pages/Users/Index"));
const User = lazy(() => import("../pages/Users/User"));
const Dashboard = lazy(() => import("../pages/Dashboard/Index"));
const Login = lazy(() => import("../pages/Auth/Login"));
const AppLayout = lazy(() => import("../layouts/AppLayout"));
const Blogs = lazy(() => import("../pages/Blogs/Index"));
const Error = lazy(() => import("../pages/Error/Index"));

const router = createBrowserRouter([
  {
    path: RouteEnums.Dashboard,
    element: (
      <Suspense fallback={<Loader fullPage />}>
        <AppLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loader fullPage />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: RouteEnums.Blogs,
        element: (
          <Suspense fallback={<Loader fullPage />}>
            <Blogs />
          </Suspense>
        ),
      },
      {
        path: RouteEnums.Blogs + "/:id",
        element: (
          <Suspense fallback={<Loader fullPage />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: RouteEnums.Blogs + "/:id/edit",
        element: (
          <Suspense fallback={<Loader fullPage />}>
            <EditBlog />
          </Suspense>
        ),
      },
      {
        path: RouteEnums.Users,
        element: (
          <Suspense fallback={<Loader fullPage />}>
            <Users />
          </Suspense>
        ),
      },
      {
        path: RouteEnums.Users + "/:id",
        element: (
          <Suspense fallback={<Loader fullPage />}>
            <User />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "auth/login",
    element: (
      <Suspense fallback={<Loader fullPage />}>
        <Login />
      </Suspense>
    ),
  },
]);

export default router;
