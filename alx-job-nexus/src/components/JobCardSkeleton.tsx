export default function JobCardSkeleton() {
    return (
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm animate-pulse">
            <div className="flex justify-between items-start">
                <div className="space-y-3 w-full">
                    {/* Title Placeholder */}
                    <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
                    {/* Company Placeholder */}
                    <div className="h-4 bg-gray-100 rounded-md w-1/2"></div>
                </div>
                {/* Badge Placeholder */}
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            </div>

            <div className="mt-6 flex gap-4">
                {/* Metadata Placeholders */}
                <div className="h-4 bg-gray-100 rounded-md w-20"></div>
                <div className="h-4 bg-gray-100 rounded-md w-24"></div>
            </div>

            {/* Button Placeholder */}
            <div className="mt-6 h-10 bg-gray-200 rounded-lg w-full"></div>
        </div>
    );
}