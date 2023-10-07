import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const INITIAL_STATE = { routine: [] };

export const getRoutine = createAsyncThunk(
    "getRoutine",
    (arg, thunkApi) => {
        async function getData(){
            const docRef = doc(db, "habits", arg);
            const docSnap = await getDoc(docRef);
      
            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              thunkApi.dispatch(add(docSnap.data()));
            } else {
              // docSnap.data() will be undefined in this case
              console.log("No such document!");
              thunkApi.dispatch(add({"routine": []}));
            }
          }
          getData();
    }
);



const routineSlice = createSlice({
    name: "routine",
    initialState: INITIAL_STATE,
    reducers: {
        add: (state, action)=>{
            state.routine = [];
            state.routine = [...action.payload.routine]
        },
        update: (state, action) =>{
            state.routine = [];
            state.routine = [...action.payload];
        }
    }
})


export const routineReducer = routineSlice.reducer;

export const { add, update } = routineSlice.actions;


export const routineSelector = (state) => state.routineReducer;