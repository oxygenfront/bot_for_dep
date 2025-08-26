import type { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { API_BASE_URL } from "./constants";

export const baseQueryFunction = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: {},
) => {
	const baseQuery = fetchBaseQuery({
		baseUrl: API_BASE_URL,
	});

	return baseQuery(args, api, extraOptions);
};

export type TBaseQueryFn = typeof baseQueryFunction;
