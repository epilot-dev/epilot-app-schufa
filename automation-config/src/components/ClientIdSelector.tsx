import {
	CardContent,
	CardHeader,
	CardTitle,
	Field,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Separator,
	Text,
} from "@epilot/volt-ui";
import { useTranslation } from "react-i18next";
import type { ClientIdOption, SchufaActionConfig } from "../types";

const NONE_VALUE = "__default__";

interface Props {
	config: SchufaActionConfig;
	clientIdOptions: ClientIdOption[];
	onChange: (next: SchufaActionConfig) => void;
}

export function ClientIdSelector({
	config,
	clientIdOptions,
	onChange,
}: Props) {
	const { t } = useTranslation();

	const value = config.client_id_key ?? NONE_VALUE;

	const handleChange = (next: string) => {
		if (next === NONE_VALUE) {
			onChange({ ...config, client_id_key: undefined });
		} else {
			onChange({ ...config, client_id_key: next });
		}
	};

	const hasOptions = clientIdOptions.length > 0;

	return (
		<>
			<CardHeader>
				<CardTitle className="volt-text-base">{t("title")}</CardTitle>
				<Text variant="body1" className="volt-text-secondary">
					{t("description")}
				</Text>
			</CardHeader>
			<Separator />
			<CardContent className="volt-flex volt-flex-col volt-gap-4">
				<div className="volt-flex volt-flex-col volt-gap-1.5">
					<Label>{t("label")}</Label>
					<Field>
						<Select
							value={value}
							onValueChange={handleChange}
							disabled={!hasOptions}
						>
							<SelectTrigger className="volt-min-h-9">
								<SelectValue placeholder={t("placeholder")} />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={NONE_VALUE}>
									{t("default_option")}
								</SelectItem>
								{clientIdOptions.map((option) => (
									<SelectItem key={option.key} value={option.key}>
										<div className="volt-flex volt-flex-col">
											<span>{option.label?.trim() || option.key}</span>
											{option.label?.trim() && (
												<span className="volt-text-xs volt-text-gray-a11">
													{option.key}
												</span>
											)}
										</div>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</Field>
					{!hasOptions && (
						<Text variant="helper1" className="volt-text-tertiary">
							{t("no_options")}
						</Text>
					)}
				</div>
			</CardContent>
		</>
	);
}
