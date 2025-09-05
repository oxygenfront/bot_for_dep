import { useSelector } from "react-redux";
import { selectUserId, selectUserStatus } from "@/entities/user";
import { HomePage } from "@/pages/Home";
import { TestPage } from "@/pages/TestPage";

export const DynamicRoute = () => {
	const userId = useSelector(selectUserId);

	const userTestStatus = useSelector(selectUserStatus);

	if (
		userId === "695606474" ||
		userId === "6600043715" ||
		userTestStatus === "approved"
	) {
		return <HomePage />;
	}

	return <TestPage />;
};
