import { createSlice } from "@reduxjs/toolkit";

const selectedPostSlice = createSlice({
    name: "SelectedPost",
    initialState: null,
    reducers: {
        setSelectedPost: (state,action)=>
        {
            return action.payload;
        }
    }
})

export const {setSelectedPost} = selectedPostSlice.actions;

export default selectedPostSlice.reducer;