
import { useState } from 'react';
import type { Job } from '../context/JobContext';

interface FormProps {
    job: Job;
    onClose: () => void;
    onSuccess: (message: string) => void;
}

export default function ApplicationForm({ job, onClose, onSuccess }: FormProps) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        resume: null as File | null,
        coverLetter: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulating API Call
        setTimeout(() => {
            console.log("Submitted Data for Job ID " + job.id + ":", formData);
            setStatus('success');
            onSuccess("Application submitted successfully!");
            onClose();
        }, 1500);
    };

    if (status === 'success') {
        return (
            <div className="text-center p-8">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold">Application Sent!</h2>
                <p className="text-gray-600 mt-2">Good luck with your application for {job.title}.</p>
                <button onClick={onClose} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg">Close</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <h2 className="text-xl font-bold border-b pb-2">Apply for {job.title}</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                    required
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 outline-blue-500"
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                    required
                    type="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 outline-blue-500"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
                <textarea
                    required
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 outline-blue-500"
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                ></textarea>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                >
                    {status === 'submitting' ? 'Sending...' : 'Submit Application'}
                </button>
            </div>
        </form>
    );
}