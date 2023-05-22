import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About, Posts, User } from "./routes";

const router = createBrowserRouter([
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
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
