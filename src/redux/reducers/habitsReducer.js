import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
const INITIAL_STATE = {
    habits: []
}


export const getHabitsData = createAsyncThunk(
    "getHabits",
    (arg, thunkApi) =>{
        const getHabits = async ()=>{
            try{
                let habits = [];
                const q = query(collection(db, "habits"));
                const querySnapshot = await getDocs(q);
                console.log("Enters async thunk");
                querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    habits.push(doc.id);
                });
                thunkApi.dispatch(addData(habits));
            }
            catch(err){
                console.log(err);
            }
        }

        getHabits();
    }
);

const habitsSlice = createSlice({
    name: "habits",
    initialState: INITIAL_STATE,
    reducers: {
        addData : (state, action) =>{
            state.habits = [];
            state.habits = [...action.payload];
        }
    }
})


export const habitsReducer = habitsSlice.reducer;

export const { addData } = habitsSlice.actions;

export const habitsSelector = (state) => state.habitsReducer;