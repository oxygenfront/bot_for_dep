import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userSlice } from "@/entities/user";
import { rootApi } from "@/shared/api";

const rootReducer = combineReducers({
	[rootApi.reducerPath]: rootApi.reducer,
	[userSlice.name]: userSlice.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(rootApi.middleware),
	devTools: true,
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
