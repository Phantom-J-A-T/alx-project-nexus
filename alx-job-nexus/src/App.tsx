import { useEffect, useRef, useState } from 'react';

import { useJobContext } from './context/JobContext';
import type { Job } from './types';

import JobCard from './components/JobCard';
import FilterBar from './components/FilterBar';
import ApplicationForm from './components/ApplicationForm';
import Toast from './components/Toast';

function App() {
  const { filteredJobs } = useJobContext();

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  });

  const toastTimeoutRef = useRef<number | null>(null);

  const triggerToast = (message: string) => {
    setToast({ message, visible: true });

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => {
      setToast({ message: '', visible: false });
      toastTimeoutRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-green-700 text-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Available Positions
          </h1>
          <p className="text-green-100 mt-1">
            Find roles that match your skills and interests
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <FilterBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={setSelectedJob}
              />
            ))
          ) : (
            <div className="col-span-full">
              <div className="rounded-xl border border-green-200 bg-white p-10 text-center">
                <p className="text-gray-600 text-lg">
                  No jobs match your current filters.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-green-100">
            <div className="border-b border-green-100 px-6 py-4">
              <h2 className="text-xl font-semibold text-green-700">
                Apply for Position
              </h2>
            </div>

            <div className="p-6">
              <ApplicationForm
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
                onSuccess={triggerToast}
              />
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      <div className="fixed bottom-6 right-6 z-50">
        <Toast message={toast.message} visible={toast.visible} />
      </div>
    </div>
  );
}

export default App;
