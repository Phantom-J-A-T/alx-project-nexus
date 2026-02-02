// src/components/JobCard.tsx
import type { Job } from '../context/JobContext';

export default function JobCard({ job }: { job: Job }) {
    return (
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                    </h3>
                    <p className="text-gray-500 mt-1 line-clamp-2 text-sm">
                        {job.description}
                    </p>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
                <span className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                    📍 {job.location}
                </span>
                {job.salary && (
                    <span className="flex items-center text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full font-medium">
                        💰 {job.salary}
                    </span>
                )}
            </div>

            <button className="mt-6 w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 active:transform active:scale-95 transition-all">
                View Details
            </button>
        </div>
    );
}