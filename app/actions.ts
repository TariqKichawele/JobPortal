'use server';

import { z } from "zod";
import { companySchema, jobSeekerSchema } from "./utils/zodSchemas";
import { requireUser } from "./utils/hooks";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";


export async function createCompany(data: z.infer<typeof companySchema>) {
    const user = await requireUser();

    const validatedData = companySchema.parse(data);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            onboardingCompleted: true,
            userType: "COMPANY",
            Company: {
                create: {
                    ...validatedData
                }
            }
        }
    });

    return redirect("/")
};

export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
    const user = await requireUser();
  
    const validatedData = jobSeekerSchema.parse(data);
  
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        onboardingCompleted: true,
        userType: "JOB_SEEKER",
        JobSeeker: {
          create: {
            ...validatedData,
          },
        },
      },
    });
  
    return redirect("/");
  }
  