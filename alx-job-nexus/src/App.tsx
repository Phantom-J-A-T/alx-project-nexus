// src/App.tsx
import { useJobContext } from './context/JobContext';
import JobCard from './components/JobCard';
import FilterBar from './components/FilterBar';

function App() {
  const { filteredJobs } = useJobContext();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Available Positions</h1>
      <FilterBar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="text-gray-500 col-span-full text-center py-10">
            No jobs match your current filters.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
