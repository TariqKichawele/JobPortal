import { prisma } from '@/app/utils/db';
import React from 'react'
import JobCard from './JobCard';
import { EmptyState } from './EmptyState';
import PaginationContent from './PaginationContent';

interface Job {
    id: string;
    jobTitle: string;
    salaryFrom: number;
    salaryTo: number;
    employmentType: string;
    location: string;
    createdAt: Date;
    company: {
        name: string;
        logo: string;
        location: string;
        about: string;
    };
}

async function getJobs( 
    page: number = 1,
    pageSize: number = 10,
    jobTypes: string[] = [],
    location: string = ""
) {
    const skip = (page - 1) * pageSize;

    const where = {
        ...(jobTypes.length > 0 && {
            employmentType: { in: jobTypes },
        }),
        ...(location && location !== "worldwide" && {
            location: location,
        })
    };

    const [data, totalCount] = await Promise.all([
        prisma.jobPost.findMany({
            skip,
            take: pageSize,
            where,
            orderBy: { createdAt: "desc" },
            select: {
                jobTitle: true,
                id: true,
                salaryFrom: true,
                salaryTo: true,
                employmentType: true,
                location: true,
                createdAt: true,
                company: {
                    select: {
                        name: true,
                        logo: true,
                        location: true,
                        about: true,
                    },
                },
            }
        }),
        prisma.jobPost.count({ where }),
    ]);

    return {
        jobs: data,
        totalPages: Math.ceil(totalCount / pageSize),
        currentPage: page
    }
}


const JobListings = async ({ 
    currentPage, 
    jobTypes, 
    location 
}: {
    currentPage: number;
    jobTypes: string[];
    location: string;
}) => {
    const { jobs, totalPages, currentPage: page } = await getJobs(currentPage, 7, jobTypes, location);
  return (
    <>
        {jobs.length > 0 ? (
            <div className="flex flex-col gap-6">
                {jobs.map((job: Job, index: number) => (
                    <JobCard job={job} key={index} />
                ))}
            </div>
        ) : (
            <EmptyState
                title="No jobs found"
                description="Try searching for a different job title or location."
                buttonText="Clear all filters"
                href="/"
            />
        )}

        <div className="flex justify-center mt-6">
            <PaginationContent totalPages={totalPages} currentPage={page} />
        </div>
    </>
  )
}

export default JobListings