import { Outlet, useLocation } from "react-router-dom";
import { Header, Sidebar } from "@/widgets";

export const Main = () => {
	const { pathname } = useLocation();
	return (
		<div className="flex w-full h-full">
			<div className="pointer-events-none fixed inset-0 -z-10">
				<div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-900 to-black" />
				<div className="absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[80vw] rounded-[40rem] bg-gradient-to-br from-indigo-400/20 via-fuchsia-400/20 to-sky-400/20 blur-3xl" />
			</div>

			<main className="flex-1 min-h-screen p-2 pt-23 pb-10 overflow-automin-h-screen ">
				<Header pathname={pathname} />
				<Outlet />
			</main>
			<Sidebar />
		</div>
	);
};
