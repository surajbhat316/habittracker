import { useSelector } from "react-redux";
import { routineSelector } from "./redux/reducers/routineReducer";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Habits from "./pages/Habits/Habits";
import Home from "./pages/Home/Home";
import HabitTimeLine from "./pages/HabitTimeLine/HabitTimeLine";

function App() {

  const {routine} = useSelector(routineSelector);
  console.log(routine);


  const router = createBrowserRouter([
    {path: "/", element: <NavigationBar /> , children: [
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
