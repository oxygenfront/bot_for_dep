import { setUser } from "@/entities/user";
import { API_TAGS, rootApi } from "@/shared/api";

export const userApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		createUser: builder.mutation<
			any,
			{ userId: string | number; username: string }
		>({
			query: (body) => ({
				url: "/user",
				method: "POST",
				body: { ...body, userId: body.userId },
			}),
			invalidatesTags: [API_TAGS.User],
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setUser({ id: data.id, username: data.username }));
				} catch {}
			},
		}),

		getUser: builder.query<any, string | number>({
			query: (userId) => `/user?userId=${userId}`,
			providesTags: [API_TAGS.User],
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(
						setUser({
							id: data.id,
							username: data.username,
							approveUser: data.approveUser,
						}),
					);
				} catch {}
			},
		}),
	}),
});

export const { useCreateUserMutation, useGetUserQuery } = userApi;
