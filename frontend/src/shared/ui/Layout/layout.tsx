import type { FC } from "react";
import { Main } from "@/widgets";
export const Layout: FC = () => {
	return (
		<div className="flex flex-col items-center">
			<Main />
		</div>
	);
};
