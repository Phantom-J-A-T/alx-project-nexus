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

export interface ApplicationData {
    fullName: string;
    email: string;
    resume: File | null;
    coverLetter: string;
}
