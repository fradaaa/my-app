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
        path: "/user/:userId",
        element: <User />,
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <div className="bg-dark text-white min-vh-100">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
};

export default App;
