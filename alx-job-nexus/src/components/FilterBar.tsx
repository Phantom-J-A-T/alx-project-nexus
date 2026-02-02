import { useJobContext } from '../context/JobContext';

export default function FilterBar() {
    const { filters, setFilters } = useJobContext();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4">
            {/* Category Filter */}
            <select
                name="category"
                onChange={handleChange}
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            >
                <option value="">All Categories</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
            </select>

            {/* Experience Level Filter */}
            <select
                name="experienceLevel"
                onChange={handleChange}
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            >
                <option value="">All Experience Levels</option>
                <option value="Entry-Level">Entry-Level</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior">Senior</option>
            </select>

            {/* Location Search */}
            <input
                type="text"
                name="location"
                placeholder="Search by location..."
                onChange={handleChange}
                className="p-2 border rounded-md flex-grow focus:ring-2 focus:ring-blue-500 outline-none"
            />
        </div>
    );
}