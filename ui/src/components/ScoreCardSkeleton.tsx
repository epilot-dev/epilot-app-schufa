export const ScoreCardSkeleton = () => {
    return (
        <div className="w-full max-w-md mx-auto shadow-sm border border-gray-200 rounded-lg bg-white p-4 space-y-4 animate-pulse">
            <div className="flex justify-between items-center">
                <div className="h-6 w-12 rounded-full bg-gray-200" />
                <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="h-3 w-14 bg-gray-200 rounded mb-2" />
                    <div className="h-8 w-16 bg-gray-200 rounded mb-2" />
                    <div className="h-3 w-24 bg-gray-200 rounded" /> 
                </div>
                <div>
                    <div className="h-3 w-20 bg-gray-200 rounded mb-2" /> 
                    <div className="h-5 w-12 bg-gray-200 rounded" />
                </div>
            </div>

            <div>
                <div className="h-3 w-40 bg-gray-200 rounded mb-2" />
                <div className="space-y-1">
                    <div className="h-3 w-56 bg-gray-200 rounded" />
                    <div className="h-3 w-48 bg-gray-200 rounded" />
                    <div className="h-3 w-60 bg-gray-200 rounded" />
                </div>
            </div>
        </div>
    );
};
