import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

export interface Job {
    id: number;
    title: string;
    description: string;
    location: string;
    salary?: string;
    company_name: string;
    job_type: string;
    category: string;
    experienceLevel: 'Entry-Level' | 'Mid-Level' | 'Senior';
}

interface JobContextType {
    jobs: Job[];
    filteredJobs: Job[];
    filters: {
        category: string;
        location: string;
        experienceLevel: string;
    };
    setFilters: React.Dispatch<React.SetStateAction<{ category: string; location: string; experienceLevel: string; }>>;
    addJob: (job: Omit<Job, 'id'>) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
    const [jobs, setJobs] = useState<Job[]>([
        {
            id: 1,
            title: 'Frontend Developer',
            description: 'We are looking for a skilled Frontend Developer to join our team.',
            location: 'Remote',
            salary: '$60k - $80k',
            company_name: 'Tech Corp',
            job_type: 'Full-time',
            category: 'Development',
            experienceLevel: 'Mid-Level'
        },
        {
            id: 2,
            title: 'Backend Engineer',
            description: 'Join our backend team to build scalable APIs.',
            location: 'New York, NY',
            salary: '$90k - $120k',
            company_name: 'Innovate Inc',
            job_type: 'Full-time',
            category: 'Development',
            experienceLevel: 'Senior'
        }
    ]);

    const [filters, setFilters] = useState({
        category: '',
        location: '',
        experienceLevel: '',
    });

    const filteredJobs = jobs.filter(job => {
        return (
            (filters.category === '' || job.category === filters.category) &&
            (filters.location === '' || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
            (filters.experienceLevel === '' || job.experienceLevel === filters.experienceLevel)
        );
    });

    const addJob = (job: Omit<Job, 'id'>) => {
        const newJob = { ...job, id: Date.now() };
        setJobs([...jobs, newJob]);
    };

    return (
        <JobContext.Provider value={{ jobs, filteredJobs, filters, setFilters, addJob }}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobContext = () => {
    const context = useContext(JobContext);
    if (!context) {
        throw new Error('useJobContext must be used within a JobProvider');
    }
    return context;
};