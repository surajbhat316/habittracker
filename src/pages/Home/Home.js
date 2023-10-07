import { useEffect, useRef, useState } from "react";
import "./Home.css";
import { db } from "../../firebase";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";

export default function Home() {


  let habitName = useRef();
  let numberOfDays = useRef();


  const [createdHabits, setCreatedHabits] = useState([]);
  const [habitExists, setHabitExists] = useState(false);
  const [habitCreated, setHabitCreated] = useState(false);


  useEffect(() => {
    async function getAllDocs(){
      let availableHabits = [];
      const q = query(collection(db, "habits"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        availableHabits.push(doc.id);
      });

      setCreatedHabits([...availableHabits]);
    }
    getAllDocs();
  },[]);


  function handleFormSubmit(e){
    e.preventDefault();
    let allHabits = [...createdHabits];
 
    if(allHabits.includes(habitName.current.value.toLowerCase())){
      setHabitExists(true);
      return;
    }

    
        let date = new Date();
        let numofDays = parseInt(numberOfDays.current.value);
        console.log(numberOfDays);

        const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday" ,"Friday", "Saturday"];
        let weeks = [];
        let count = 0;

        let ans = [];
        let key = "week_"+ 1;
        let ansObj = {};

        for(let i=1;i<=numofDays;i++){
          console.log("Enters for loop");
            key = "week_"+count;
            let newDate = new Date();
            newDate.setDate(date.getDate() + i);

            let newDateObject = {
                "habitName": habitName.current.value.toLowerCase(),
                "week": "week "+count,
                "date": newDate.getDate(),
                "month": newDate.getMonth()+1,
                "year": newDate.getFullYear(),
                "day": days[newDate.getDay()],
                "completed": "none"
            }

            weeks.push(newDateObject);
            if( i % 7 === 0){
                ansObj[key] = weeks;
                ans.push(ansObj);
                ansObj = {};
                count++;
                weeks = [];
            }
        }

        if(weeks.length !== 0){
            ansObj[key] = weeks;
            ans.push(ansObj);
            ansObj = {};
            weeks = [];
        }
        console.log(ans);

        async function sendData(){

          await setDoc(doc(db, "habits", habitName.current.value.toLowerCase()), {
            routine : [...ans]
          });
          setHabitCreated(true);
          habitName.current.value = "";
          numberOfDays.current.value = "";
        }

        sendData();


  }



  return (
    <div>
      <div id="formContainer">
        <form id="habitForm" onSubmit={handleFormSubmit}>

          {habitExists && <>
            <div className="alert alert-primary" role="alert">
              Habit already exists, Use a different name
            </div>
          </>}

          {habitCreated && <>
            <div className="alert alert-primary" role="alert">
              Habit Created Successfully
            </div>
          </>}
          <h2 className="text-center">Create a Habit</h2>
          <div>
            <input className="form-control" ref={habitName} type="text" required placeholder="Habit Name" />
          </div>
          <div>
            <input className="form-control" ref={numberOfDays} type="number" required placeholder="No of days" />
          </div>
          <div>
            <button className="btn btn-primary">Submit</button>
          </div>
          
        </form>
      </div>


    </div>
  )
}
