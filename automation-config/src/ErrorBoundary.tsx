import React from "react";
import { useTranslation } from "react-i18next";

interface ErrorBoundaryProps {
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

export class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	state: ErrorBoundaryState = { hasError: false };

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: unknown, info: React.ErrorInfo) {
		console.error("ErrorBoundary caught an error:", error, info);
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback ?? null;
		}
		return this.props.children;
	}
}

export const ErrorFallback = () => {
	const { t } = useTranslation();
	return (
		<div className="flex flex-col items-center justify-center h-full p-4 space-y-4">
			<p className="text-2xl font-semibold text-gray-800">
				{t("error_boundary_heading", "Something went wrong")}
			</p>
		</div>
	);
};
