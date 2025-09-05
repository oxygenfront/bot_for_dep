import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const titlesMap = {
	"/": "Главная",
	"/management": "Управление",
	"/management/*": "Управление пользователем",
} as const;

export const Header = ({ pathname }: { pathname: string }) => {
	const title =
		titlesMap[pathname as keyof typeof titlesMap] ||
		(pathname.startsWith("/management/") && titlesMap["/management/*"]) ||
		"";

	return (
		<div className="fixed top-0 left-0 z-20 w-full backdrop-blur bg-black/30 border-b border-white/5">
			<div className="mx-auto max-w-3xl h-[64px] px-4 py-3 flex items-center gap-3">
				{pathname !== "/" && (
					<button
						type="button"
						onClick={() => window.history.back()}
						className="group relative flex items-center justify-center h-10 w-10 rounded-xl bg-white/10 ring-1 ring-white/10"
						aria-label="Назад"
					>
						<ArrowLeftIcon className="w-5 h-5 text-zinc-100 group-hover:-translate-x-0.5 transition-transform" />
					</button>
				)}
				<h1 className="text-base font-semibold tracking-tight text-zinc-100">
					{title}
				</h1>
			</div>
		</div>
	);
};
