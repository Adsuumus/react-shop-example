import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { NotFound, LoginPage, ItemPage, Contact, About, Home } from "../pages";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "/product/:id", element: <ItemPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    basename: "/react-shop-example/",
  },
);

export function Router() {
  return <RouterProvider router={router} />;
}
