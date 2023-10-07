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
              if(clonedObject.completed === "none"){
                clonedObject.completed = "done"
              }
              else if(clonedObject.completed === "done"){
                clonedObject.completed = "not done"
              }
              else{
                clonedObject.completed = "none";
              }
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


  function checkDate(date,month,year){
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth() +1;
    const todayYear = today.getFullYear();

    let dateDifference = parseInt(todayDate)+ -  parseInt(date)
    if(dateDifference < 7 && parseInt(date) <= parseInt(todayDate) && parseInt(month) <= parseInt(todayMonth) && parseInt(year) <= parseInt(todayYear)){
      return false;
    }
    return true;
  }

  function checkIfToday(date,month,year){
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth() +1;
    const todayYear = today.getFullYear();
    if(parseInt(date) === parseInt(todayDate) && parseInt(month) === parseInt(todayMonth) && parseInt(year) === parseInt(todayYear)){
      return true;
    }
    return false;

  }


  return (
    <div>
      <div>
      {routine.map((item,i) => {
        let key = "week_"+i;
        return (
          <div key={i}>
            <h2 className="text-center">Week {i} of {name}</h2>
            <div className="container1">
            {item[key].map((val, j) => {
              return (
                    <div className={checkIfToday(val.date, val.month, val.year)?"today":"notToday" } key={j}>
                      <p>Day : <b>{val.day}</b></p>
                      <p>Date : <b>{val.date}/{val.month}/{val.year}</b></p>
                      <p>Status : <b>{val.completed}</b></p>
                      <button className="btn btn-secondary" onClick={() => handleStatus(item, key, val)}
                        disabled ={checkDate(val.date, val.month,val.year )}
                      
                      >{val.completed === "none"?"Mark as Done": val.completed === "done" ? "Mark as Not Done":"Mark as None"}</button>
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
