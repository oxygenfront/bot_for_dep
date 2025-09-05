export const getSidebarTabs = (userId: string) => {
	const isAdmin = userId === "695606474" || userId === "6600043715";

	const baseTabs = [
		{ label: "Главная", path: "/" },
		{ label: "Топ клиенты", path: "/top-clients" },
		{ label: "Благотворительность", path: "/philanthropy" },
		{ label: "Слеты инвесторов", path: "/event-investors" },
	];

	const adminTabs = [
		{ label: "Управление", path: "/management" },
		{ label: "Редактировать контент", path: "/edit-content" },
	];

	return isAdmin ? [...baseTabs, ...adminTabs] : baseTabs;
};
