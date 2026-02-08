// src/components/JobCard.tsx
import type { Job } from '../types';

interface JobCardProps {
    job: Job;
    onApply: (job: Job) => void;
}

export default function JobCard({ job, onApply }: JobCardProps) {
    return (
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {job.title}
                </h3>
                <p className="text-gray-500 mt-1 line-clamp-2 text-sm">
                    {job.description}
                </p>

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
            </div>

            <div className="mt-6 space-y-2">
                <button className="w-full bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200 transition-all">
                    View Details
                </button>
                <button
                    onClick={() => onApply(job)}
                    className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
                >
                    Apply Now
                </button>
            </div>
        </div>
    );
}