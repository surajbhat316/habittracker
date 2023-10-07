import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getRoutine, routineSelector, update } from "../../redux/reducers/routineReducer";
import "./HabitTimeLine.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function HabitTimeLine() {

  const {name} = useParams();
  const dispatch = useDispatch();

  let {routine} = useSelector(routineSelector);
  console.log(routine);
  useEffect(()=>{
    dispatch(getRoutine(name));
  },[dispatch,name])


  async function handleStatus(item, key, val){

    let routineCopy = [...routine];
    let updatedRoutines = [];
    routineCopy.forEach((item) => {
      let itemClone = {...item};
      if(itemClone.hasOwnProperty(key)){
        let newList = [];
        itemClone[key].forEach((v) => {
            let clonedObject = {...v};
            if(clonedObject.date === val.date && clonedObject.day === val.day && clonedObject.year === val.year){
              clonedObject.completed = !clonedObject.completed; 
            }
            newList.push(clonedObject);
        })
        itemClone[key] = [...newList]
        updatedRoutines.push(itemClone);
      }else{
        updatedRoutines.push(itemClone);
      }
    })
    dispatch(update(updatedRoutines));

    async function updateDB(){
      const habitDocRef = doc(db, "habits", name);

      await updateDoc(habitDocRef, {
        routine: [...updatedRoutines]
      });
    }

    updateDB();

  }
  return (
    <div>
      <div>
      {routine.map((item,i) => {
        let key = "week_"+i;
        return (
          <div key={i}>
            <h2>Week {i} of {name}</h2>
            <div className="container1">
            {item[key].map((val, j) => {
              return (
                    <div key={j}>
                      <p>{val.day}</p>
                      <p>{val.date} / {val.month} / {val.year}</p>
                      <p>{val.completed? "Completed" :"In Progress"}</p>
                      <button onClick={() => handleStatus(item, key, val)}>{!val.completed?"Mark as Completed": "Mark as In Progress"}</button>
                    </div>
              );
            })}
            </div>
          </div>
        );
      })}
      </div>

    </div>
  )
}
