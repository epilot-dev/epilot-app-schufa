import { Card, CardContent, Spinner } from "@epilot/volt-ui";
import { ClientIdSelector } from "./components/ClientIdSelector";
import { useActionConfig } from "./hooks/useActionConfig";

export function App() {
	const { config, updateConfig, clientIdOptions, loaded } = useActionConfig();

	if (!loaded) {
		return (
			<Card className="volt-w-full">
				<CardContent className="volt-flex volt-items-center volt-justify-center volt-py-8">
					<Spinner size="lg" />
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="volt-flex volt-flex-col volt-gap-4 volt-w-full">
			<Card className="volt-w-full">
				<ClientIdSelector
					config={config}
					clientIdOptions={clientIdOptions}
					onChange={updateConfig}
				/>
			</Card>
		</div>
	);
}
