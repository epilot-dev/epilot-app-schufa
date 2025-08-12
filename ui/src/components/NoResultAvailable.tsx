export const NoResultAvailable = () => {

    return <div className="flex flex-col items-center justify-center h-full p-4 space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">
            No results available
        </h1>

        <div className="text-gray-600">
            Please try again later or contact support if the issue persists.
        </div>
    </div>
}