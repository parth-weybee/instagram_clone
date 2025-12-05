import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import profileReducer from './profileSlice';
import postReducer from './createPostSlice';
import profilePostReducer from './profilePostsSlice';
import searchReducer from './searchSlice';

const appStore = configureStore({
    reducer: {
        User: userReducer,
        Profile: profileReducer,
        CreatePost: postReducer,
        ProfilePost: profilePostReducer,
        searchUserName: searchReducer
    }
})

export default appStore;