import { isAxiosError } from "axios";

interface ErrorCardProps {
    error: unknown;
    title?: string;
}

const getErrorMessage = (error: unknown): string => {
    if (isAxiosError(error)) {
        return error.response?.data?.message || error.message;
    }
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === "string") {
        return error;
    }
    return "Es ist ein unbekannter Fehler aufgetreten.";
};

export const ErrorCard = ({ error, title = "Fehler" }: ErrorCardProps) => {
    const message = getErrorMessage(error);

    return (
        <div className="w-full max-w-md mx-auto border border-red-200 bg-red-50 rounded-lg p-4 shadow-sm">
            {/* Header */}
            <div className="flex items-center mb-2">
                <svg
                    className="w-5 h-5 text-red-600 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                    />
                </svg>
                <h2 className="text-sm font-semibold text-red-800">{title}</h2>
            </div>

            {/* Message */}
            <p className="text-sm text-red-700 leading-snug">{message}</p>
        </div>
    );
};
