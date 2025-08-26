import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./style.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { store } from "./store";

// biome-ignore lint/style/noNonNullAssertion: <>
createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
);
