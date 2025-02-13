import OnboardingForm from '@/components/forms/OnboardingForm'
import React from 'react'
import { prisma } from '../utils/db'
import { redirect } from 'next/navigation';
import { requireUser } from '../utils/hooks';

async function checkIfUserHasFinishedOnboarding(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            onboardingCompleted: true
        }
    });

    if (user?.onboardingCompleted === true) {
        redirect("/")
    }
}

const Onboarding = async () => {
    const session = await requireUser();

    await checkIfUserHasFinishedOnboarding(session.id as string);
    
  return (
    <div className="min-h-screen w-screen py-10 flex flex-col items-center justify-center">
      <OnboardingForm />
    </div>
  )
}

export default Onboarding