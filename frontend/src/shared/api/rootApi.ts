import { createApi } from "@reduxjs/toolkit/query/react";
import { API_TAGS } from "@/shared/api";
import { baseQueryFunction } from "@/shared/api/utils/baseQuery";

export const rootApi = createApi({
	reducerPath: "rootApi",
	refetchOnReconnect: true,

	baseQuery: baseQueryFunction,
	tagTypes: [API_TAGS.UserTest, API_TAGS.User],
	endpoints: () => ({}),
});
