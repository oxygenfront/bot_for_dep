import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "@/entities/user/api";

export const ManagementPage = () => {
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	const { data: users = [], isLoading } = useGetUsersQuery(search);

	const statusStyles: Record<string, string> = {
		approved: "bg-emerald-400 ring-emerald-200",
		pending: "bg-amber-400 ring-amber-200",
		rejected: "bg-rose-400 ring-rose-200",
		not_started: "bg-zinc-300 ring-zinc-200",
	};

	return (
		<div className="relative w-full max-w-3xl mx-auto py-12 px-4">
			<div className="p-[1px] rounded-3xl bg-gradient-to-br from-indigo-500/50 via-fuchsia-500/50 to-sky-500/50 shadow-lg">
				<div className="bg-zinc-900/60 backdrop-blur-xl rounded-3xl p-6 space-y-6">
					<input
						type="text"
						placeholder="Поиск пользователя..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="
              w-full
              bg-white/5
              border border-white/10
              rounded-lg
              px-4 py-2
              text-zinc-100
              placeholder:text-zinc-500
              focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50
              transition
            "
					/>

					{/* Список пользователей */}
					<ul className="space-y-4 max-h-[60vh] overflow-y-auto">
						{isLoading
							? // Skeleton-загрузка
								Array.from({ length: 4 }).map((_, idx) => (
									<li
										// biome-ignore lint/suspicious/noArrayIndexKey: <>
										key={idx}
										className="flex items-center space-x-4 p-4 rounded-xl bg-white/10 animate-pulse"
									>
										<div className="h-3 w-3 rounded-full bg-zinc-600" />
										<div className="h-4 w-32 rounded bg-zinc-600" />
									</li>
								))
							: users.map((u: any) => (
									<li key={u.id}>
										<button
											type="button"
											onClick={() => navigate(`/management/${u.id}`)}
											className="
                      w-full flex items-center gap-4 p-4
                      bg-white/5
                      backdrop-blur-md
                      rounded-2xl
                      hover:shadow-xl hover:-translate-y-0.5
                      transition
                    "
										>
											<span
												className={`
                        h-3 w-3 rounded-full ring-1
                        ${statusStyles[u.approveUser] || statusStyles.not_started}
                      `}
											/>
											<div className="flex flex-col text-left">
												<span className="text-base font-medium text-zinc-100">
													{u.username || "Без имени"}
												</span>
												<span className="text-xs text-zinc-400">
													ID: {u.id}
												</span>
											</div>
										</button>
									</li>
								))}
					</ul>
				</div>
			</div>
		</div>
	);
};
