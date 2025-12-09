import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import profileReducer from './profileSlice';
import postReducer from './createPostSlice';
import profilePostReducer from './profilePostsSlice';
import searchReducer from './searchSlice';
import selectedPostReducer from './selectedPostSlice';
import feedReducer from './feedSlice';

const appStore = configureStore({
    reducer: {
        User: userReducer,
        Profile: profileReducer,
        CreatePost: postReducer,
        ProfilePost: profilePostReducer,
        searchUserName: searchReducer,
        selectedPost: selectedPostReducer,
        Feed: feedReducer
    }
})

export default appStore;