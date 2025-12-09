import { createSlice } from "@reduxjs/toolkit";

const selectedPostSlice = createSlice({
    name: "SelectedPost",
    initialState: {
        selectedPost: null,
        ShowSelectedPost: false
    },
    reducers: {
        setSelectedPost: (state,action)=>
        {
            state.selectedPost = action.payload;
        },
        toggleShowSelectedPost: (state,action)=>
        {
            state.ShowSelectedPost = action.payload;
        }
    }
})

export const {setSelectedPost,toggleShowSelectedPost} = selectedPostSlice.actions;

export default selectedPostSlice.reducer;