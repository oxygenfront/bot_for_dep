import { isTMA, retrieveLaunchParams } from "@telegram-apps/sdk";
import { type FC, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
	selectUserId,
	selectUsername,
	useCreateUserMutation,
	useGetUserQuery,
} from "@/entities/user";
import { Layout } from "@/shared/ui";

export const BaseLayout: FC = () => {
	const [params] = useSearchParams();
	const storeUserId = useSelector(selectUserId); // селектор возвращает id или null/undefined
	const storeUsername = useSelector(selectUsername);

	const { userId, username } = useMemo(() => {
		if (isTMA()) {
			const launchParams = retrieveLaunchParams();
			const user = launchParams?.tgWebAppData?.user;
			if (user) {
				return { userId: user.id, username: user.username };
			}
		}

		if (storeUserId && storeUsername) {
			return { userId: storeUserId, username: storeUsername };
		}

		return {
			userId: params.get("userId") ?? undefined,
			username: params.get("username") ?? undefined,
		};
	}, [params, storeUserId, storeUsername]);
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

	return <Layout />;
};
