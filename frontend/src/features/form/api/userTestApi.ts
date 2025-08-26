import { setStatus } from "@/entities/user";
import { API_TAGS, rootApi } from "@/shared/api";

export const userTestApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		createTest: builder.mutation<
			any,
			{ userId: string; answers: Record<string, any> }
		>({
			query: (body) => ({
				url: "/user-test",
				method: "POST",
				body: { ...body, userId: body.userId },
			}),
			invalidatesTags: (result, error) =>
				!result || error ? [] : [API_TAGS.UserTest],
			async onQueryStarted(_, { dispatch }) {
				try {
					dispatch(setStatus("pending"));
				} catch {}
			},
		}),
	}),
});

export const { useCreateTestMutation } = userTestApi;
