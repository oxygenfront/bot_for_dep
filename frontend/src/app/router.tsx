import { createBrowserRouter } from "react-router-dom";
import { DynamicRoute } from "@/app/dynamicRoute";
import { BaseLayout as App } from "@/app/layout";
import { ManagementPage, UserManagementPage } from "@/pages/Management";
import { PATH } from "@/shared/constants";

export const router = createBrowserRouter([
	{
		path: PATH.BASE,
		element: <App />,
		children: [
			{
				path: "/",
				element: <DynamicRoute />,
			},
			{
				path: "/management",
				element: <ManagementPage />,
			},
			{
				path: "management/:userId",
				element: <UserManagementPage />,
			},
		],
	},
]);
