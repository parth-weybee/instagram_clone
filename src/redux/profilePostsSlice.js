import { createSlice } from "@reduxjs/toolkit";

const profilePostsSlice = createSlice({
    name: "ProfilePosts",
    initialState: null,
    reducers:{
        setProfilePosts: (state,action)=>
        {
            return action.payload
        }
    }
})

export const {setProfilePosts} = profilePostsSlice.actions

export default profilePostsSlice.reducer;