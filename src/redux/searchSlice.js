import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        showSearchContainer: false,
        searchText: "",
    },
    reducers:
    {
        toggleShowSearch: (state,action)=>
        {
            state.showSearchContainer = action.payload
        },
        setSearchText: (state,action)=>
        {
            state.searchText = action.payload
        }
    }
})

export const {toggleShowSearch,setSearchText} = searchSlice.actions;

export default searchSlice.reducer;