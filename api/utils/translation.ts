// TODO @seb: Move to i18n package this is just a temporary solution
export const translateErrorMessage = (params: {
	message: string;
	lang?: string;
}) => {
	const { message, lang = "de" } = params;

	const translation = translations[message];

	if (translation?.[lang]) {
		return translation[lang];
	}

	return message;
};

const translations: Record<string, Record<string, string>> = {
	"Person was not found in Schufa database": {
		de: "Die Person wurde nicht in der Schufa-Datenbank gefunden.",
		en: "The person was not found in the Schufa database.",
	},
	"Invalid signature": {
		de: "Ungültige Signatur",
		en: "Invalid signature",
	},
	"Unexpected error while processing SCHUFA check": {
		de: "Unerwarteter Fehler bei der Verarbeitung der SCHUFA-Prüfung",
		en: "Unexpected error while processing SCHUFA check",
	},
	"Missing access token in request headers.": {
		de: "Fehlender Zugriffstoken in den Anforderungsheadern.",
		en: "Missing access token in request headers.",
	},
};
