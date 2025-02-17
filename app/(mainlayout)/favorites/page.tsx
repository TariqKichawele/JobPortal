import { prisma } from '@/app/utils/db';
import { requireUser } from '@/app/utils/hooks'
import { EmptyState } from '@/components/general/EmptyState';
import JobCard from '@/components/general/JobCard';
import React from 'react'

interface FavoriteJob {
    job: {
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
    };
}

async function getFavorites(userId: string) {
    const data = await prisma.savedJobPost.findMany({
        where: {
            userId: userId,
        },
        select: {
            job: {
            select: {
                id: true,
                jobTitle: true,
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
            },
            },
        },
    });
  
    return data;
}

const FavoritesPage = async () => {
    const session = await requireUser();
    const favorites = await getFavorites(session.id as string);

    if (favorites.length === 0) {
        return (
            <EmptyState
                title="No favorites found"
                description="You don't have any favorites yet."
                buttonText="Find a job"
                href="/jobs"
            />
        );
    }
  return (
    <div className="grid grid-cols-1 mt-5   gap-4">
        {favorites.map((favorite: FavoriteJob) => (
            <JobCard job={favorite.job} key={favorite.job.id} />
        ))}
    </div>
  )
}

export default FavoritesPage