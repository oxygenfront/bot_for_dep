import { createBrowserRouter } from "react-router-dom";
import { BaseLayout as App } from "@/app/layout";
import { TestForm } from "@/features/form/ui/TestForm";
import { PATH } from "@/shared/constants";

export const router = createBrowserRouter([
	{
		path: PATH.BASE,
		element: <App />,
		children: [
			{
				path: "/",
				element: <TestForm />,
			},
		],
		// children: [
		//     {
		//         path: PATH.BASE,
		//         element: <ChaptersLinksBlock />,
		//     },
		//     {
		//         path: PATH.WARRANTOR,
		//         element: <WarrantorPage />,
		//     },
		//     {
		//         path: PATH.CHAPTER,
		//         element: <ChapterPage />,
		//     },
		//     {
		//         path: PATH.THEME,
		//         element: <ThemePage />,
		//     },
		//     {
		//         path: PATH.PROFILE,
		//         element: <Profile />,
		//     },
		//     {
		//         path: PATH.ALL_CHATS,
		//         element: <AllChatsPages />,
		//     },
		//     {
		//         path: PATH.CHAT,
		//         element: <Chat />,
		//     },
		//     {
		//         path: PATH.ADMIN,
		//         element: <Admin />,
		//     },
		// ],
	},
]);
