import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user_slice'

export const store = configureStore({
	reducer: {
	 user: userReducer
 },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
