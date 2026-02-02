import { useState } from 'react';
import { useJobContext } from './context/JobContext';
import type { Job } from './context/JobContext';
import JobCard from './components/JobCard';
import FilterBar from './components/FilterBar';
import ApplicationForm from './components/ApplicationForm';
import Toast from './components/Toast';

function App() {
  const { filteredJobs } = useJobContext();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const triggerToast = (msg: string) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 3000); // Hide after 3 seconds
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Available Positions</h1>
      <FilterBar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onApply={setSelectedJob}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center py-10">
            No jobs match your current filters.
          </p>
        )}
      </div>

      {/* Modal Overlay */}

      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <ApplicationForm
              job={selectedJob}
              onClose={() => setSelectedJob(null)}
              onSuccess={triggerToast}
            />
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}

export default App;