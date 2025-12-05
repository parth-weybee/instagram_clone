import { createSlice } from "@reduxjs/toolkit";

const createPostSlice = createSlice({
    name: "CreatePost",
    initialState: {
        showPostContainer: false,
        postImages: null,
        postDetails: null,
        imagesFiles: null,
    },
    reducers: {
        togglePostContainer: (state,action)=>
        {
            state.showPostContainer = action.payload;
        },
        setPostImages: (state,action)=>
        {
            state.postImages = action.payload;
        },
        setImagesFiles: (state,action)=>
        {
            state.imagesFiles = action.payload;
        },
        setPostDetails: (state,action)=>
        {
            state.postDetails = action.payload;
        }
    }
})

export const {togglePostContainer,setPostImages,setPostDetails,setImagesFiles} = createPostSlice.actions;

export default createPostSlice.reducer;