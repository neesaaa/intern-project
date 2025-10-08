import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./MainLayout";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dash from "./pages/Dash";
import Instructorspage from "./pages/Instructorspage";
import CoursesPage from "./pages/CoursesPage";
import CourseAddPage from "./pages/CourseAddPage";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Dash />,
        },
        {
          path: "/instructors",
          element: <Instructorspage />,
        },
        {
          path: "/courses",
          element: <CoursesPage />,
        },
        {
          path: "add",
          element: <CourseAddPage />,
        },
        {
          path: ":courseId/edit",
          element: <CourseAddPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </QueryClientProvider>
  );
}

export default App;
