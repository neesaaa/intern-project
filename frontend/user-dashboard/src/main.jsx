import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import MainLayout from "./MainLayout.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CoursesPage from "./pages/CoursesPage.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import CourseDetailPage from "./pages/CourseDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import Checkoutpage from "./pages/Checkoutpage.jsx";
import DonePage from "./pages/DonePage.jsx";
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Landing /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "courses", element: <CoursesPage /> },
          { path: "courses/:courseId", element: <CourseDetailPage /> },
          { path: "cart", element: <CartPage /> },
          { path: "checkout", element: <Checkoutpage /> },
          { path: "done", element: <DonePage /> },
        ],
      },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </QueryClientProvider>
  </StrictMode>
);
