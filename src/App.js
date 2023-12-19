
import { RouterProvider, createHashRouter } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Habits from "./pages/Habits/Habits";
import Home from "./pages/Home/Home";
import HabitTimeLine from "./pages/HabitTimeLine/HabitTimeLine";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {

  const router = createHashRouter([
    {path: "/", element: <NavigationBar /> ,errorElement: <ErrorPage/>, children: [
      {index: true, element: <Home />},
      {path: "habits", element: <Habits />},
      {path: "habits/:name", element: <HabitTimeLine />}
    ]}
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
