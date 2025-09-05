import { Bars3Icon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserId, selectUsername } from "@/entities/user";
import { getSidebarTabs } from "./config";

export const Sidebar = () => {
	const userId = useSelector(selectUserId) as string;
	const username = useSelector(selectUsername);
	const tabs = getSidebarTabs(userId);
	const [open, setOpen] = useState(false);

	return (
		<Fragment>
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="
          fixed top-4 right-4 z-[100]
          p-2 rounded-lg
         bg-zinc-900/95
          backdrop-blur-sm
          shadow-md
        "
			>
				<Bars3Icon className="h-6 w-6 text-gray-100" />
			</button>

			<div
				className={`
                          fixed top-0 right-0 h-full w-72 z-50
                          transform transition-transform duration-300
                          ${open ? "translate-x-0" : "translate-x-full"}
                          p-[1px] rounded-3xl
                          bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-sky-600
                          shadow-lg
        `}
			>
				<div className="h-full bg-zinc-900 rounded-3xl flex flex-col">
					<div
						className="
            flex items-center justify-between rounded-t-3xl
            px-6 py-4
            border-b border-zinc-700
            bg-zinc-900
          "
					>
						<span className="text-lg font-semibold text-white">Меню</span>
					</div>

					<ul className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
						{tabs.map((tab, idx) => (
							<li
								key={tab.path}
								className="opacity-0 animate-slideUp"
								style={{ animationDelay: `${idx * 0.05}s` }}
							>
								<NavLink
									to={`${tab.path}?userId=${userId}&username=${username}`}
									onClick={() => setOpen(false)}
									className={({ isActive }) =>
										`block px-4 py-2 rounded-lg text-base font-medium transition ${
											isActive
												? "bg-blue-600 text-white shadow"
												: "text-gray-600 hover:bg-blue-100 hover:text-blue-700"
										}`
									}
								>
									{tab.label}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			</div>
		</Fragment>
	);
};
