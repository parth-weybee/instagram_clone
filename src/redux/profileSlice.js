import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "Profile",
    initialState: {
        userProfile: null
    },
    reducers:
    {
        setProfile: (state,action)=>
        {
            state.userProfile = action.payload;
        }
    }
});

export const {setProfile} = profileSlice.actions;

export default profileSlice.reducer;