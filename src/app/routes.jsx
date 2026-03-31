import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import MoodLift from "../pages/MoodLift/MoodLift";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/moodlift",
        element: <MoodLift />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
