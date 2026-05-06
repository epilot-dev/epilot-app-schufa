import { initialize } from "@epilot/app-bridge";
import { useEffect, useState } from "react";
import { i18n } from "./i18n";

export const AppBridgeProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		initialize({ timeout: 2000 })
			.then(({ lang }) => {
				i18n.changeLanguage(lang);
			})
			.catch((err) => {
				console.warn(
					"[schufa-automation-config] App bridge init failed (standalone mode):",
					err,
				);
			})
			.finally(() => {
				setReady(true);
			});
	}, []);

	if (!ready) {
		return null;
	}

	return <>{children}</>;
};
