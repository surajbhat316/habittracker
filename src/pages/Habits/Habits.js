import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getHabitsData, habitsSelector } from "../../redux/reducers/habitsReducer";
import "./Habits.css";
import { NavLink } from "react-router-dom";

export default function Habits() {

  const dispatch = useDispatch();

  const {habits} = useSelector(habitsSelector);
  console.log(habits);
  useEffect(()=>{
    dispatch(getHabitsData())
  },[dispatch]);
  return (
    <div id="habitsContainer">
      <div className="add_btn">
        <NavLink style={{color: "white", textDecoration: "none"}} id="createNew" to="/">
            Add New Habit
        </NavLink>
      </div>
      {habits.map((habit,i) => {

        return (
          <div className="habit" key={i}>
            <div className="habitName">
              <p>
                <NavLink className="link" style={{textDecoration:"none", color: "white"}} to={"/habits/"+habit}>
                {habit}
                </NavLink>
              </p>
            </div>
        </div>
        );

      })}
    </div>
  )
}
