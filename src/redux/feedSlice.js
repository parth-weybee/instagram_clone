import { createSlice, current } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "Feed",
    initialState: {
        feed: [],
        currentData: null,
    },
    reducers: {
        addPostsToFeed: (state,action)=>
        {
            if(!state.currentData || state.currentData?.page !== action.payload?.page )
            {
                state.feed.push(...action.payload.posts);
                state.currentData = action.payload;
            }
        }
    }
})

export const {addPostsToFeed} = feedSlice.actions;

export default feedSlice.reducer;