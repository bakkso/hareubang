import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { Layout } from "../components/Layout";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import QuickPage from "../pages/Quick";
import RegularPage from "../pages/Regular";
import { RouterPath } from "./path";
import TranslationApp from "../pages/TranslationApp";
import BookmarkPage from "../pages/Bookmark";

const router = createBrowserRouter([
  {
    path: RouterPath.root,
    element: <Layout />,
    children: [
      {
        path: RouterPath.home,
        element: <HomePage />,
      },
      {
        path: RouterPath.quick,
        element: <QuickPage />,
      },
      {
        path: RouterPath.regular,
        element: <RegularPage />,
      },
      {
        path: RouterPath.notFound,
        element: <Navigate to={RouterPath.home} />,
      },
      {
        path: RouterPath.bookmark,
        element: <BookmarkPage />,
      },
      {
        path: '/translation',
        element: <TranslationApp />,
      }
    ],
  },
  {
    path: RouterPath.login,
    element: <LoginPage />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
