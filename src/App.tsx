import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Header } from "./components";
import { store } from "./redux/store";
import { About, Posts, User } from "./routes";

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
