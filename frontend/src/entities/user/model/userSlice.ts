import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
	id: string | null;
	username: string | null;
	approveUser: "needTesting" | "pending" | "rejected" | "approved";
}

const initialState: UserState = {
	id: null,
	username: null,
	approveUser: "needTesting",
};

export const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		setUser(
			state,
			action: PayloadAction<{
				id: string;
				username: string;
				approveUser?: "needTesting" | "pending" | "rejected" | "approved";
			}>,
		) {
			state.id = action.payload.id;
			state.username = action.payload.username;
			if (action.payload.approveUser) {
				state.approveUser = action.payload.approveUser;
			}
		},
		clearUser(state) {
			state.id = null;
			state.username = null;
			state.approveUser = "needTesting";
		},
		setStatus(state, action: PayloadAction<UserState["approveUser"]>) {
			state.approveUser = action.payload;
		},
	},
});

export const { setUser, clearUser, setStatus } = userSlice.actions;
export default userSlice.reducer;
