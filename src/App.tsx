import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About, Posts, User } from "./routes";
import { Header } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Posts />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/users/:userId",
        element: <User />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
