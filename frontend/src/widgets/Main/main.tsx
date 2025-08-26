import { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { useCreateUserMutation, useGetUserQuery } from "@/entities/user/api";

export const Main = () => {
	const [params] = useSearchParams();
	const userId = params.get("userId");
	const username = params.get("username");

	const { isLoading, isError } = useGetUserQuery(userId as string | number, {
		skip: !userId,
	});

	const [createUser, { isLoading: isCreating, isError: isCreateError }] =
		useCreateUserMutation();

	useEffect(() => {
		if (isError && userId && username) {
			createUser({ userId, username });
		}
	}, [isError, userId, username, createUser]);

	if (!userId || !username) {
		return <span>Отсутствуют обязательные параметры</span>;
	}

	if (isLoading || isCreating) {
		return <span>Loading...</span>;
	}

	if (isError || isCreateError) {
		return <span>Произошла ошибка при загрузке или создании пользователя</span>;
	}

	return <Outlet />;
};
