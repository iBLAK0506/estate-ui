import HomePage from "./routes/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import Layout from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import CreatePage from "./routes/createPage/createPage";
import RequireAuth from "./routes/layout/requireAuth";
// This import is needed to make the "Update Profile" link work
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        // --- PUBLIC ROUTES ---
        // These are accessible to everyone
        { path: "/", element: <HomePage /> },
        { path: "/list", element: <ListPage /> },
        { path: "/properties/:id", element: <SinglePage /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },

        // --- PROTECTED ROUTES ---
        // These are guarded by the RequireAuth component
        {
          element: <RequireAuth />,
          children: [
            { path: "/profile", element: <ProfilePage /> },
            { path: "/create", element: <CreatePage /> },
            // This route makes the link to the update page functional
            { path: "/profile/update", element: <ProfileUpdatePage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
