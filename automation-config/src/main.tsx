import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n"; // must be imported before any component that uses useTranslation
import { App } from "./App";
import { AppBridgeProvider } from "./AppBridgeProvider";
import { ErrorBoundary, ErrorFallback } from "./ErrorBoundary";
import "./App.css";
import "@epilot/volt-ui/font.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ErrorBoundary fallback={<ErrorFallback />}>
			<AppBridgeProvider>
				<App />
			</AppBridgeProvider>
		</ErrorBoundary>
	</StrictMode>,
);
