import type { RootState } from "@/app/store";

export const selectUser = (state: RootState) => state.userSlice;

export const selectUserId = (state: RootState) => state.userSlice.id;

export const selectUsername = (state: RootState) => state.userSlice.username;

export const selectUserStatus = (state: RootState) =>
	state.userSlice.approveUser;

export const selectIsAuthenticated = (state: RootState) =>
	Boolean(state.userSlice.id);
