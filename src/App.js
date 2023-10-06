import { useSelector } from "react-redux";
import { routineSelector } from "./redux/reducers/routineReducer";

function App() {

  const {routine} = useSelector(routineSelector);
  console.log(routine);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export default App;
