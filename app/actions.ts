'use server';

import { z } from "zod";
import { companySchema, jobSeekerSchema } from "./utils/zodSchemas";
import { requireUser } from "./utils/hooks";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import arcjet, { detectBot, shield } from "./utils/arcjet";
import { request } from "@arcjet/next";

const aj = arcjet
    .withRule(
        shield({
            mode: "LIVE"
        })
    )
    .withRule(
        detectBot({
            mode: "LIVE",
            allow: []
        })
    )


export async function createCompany(data: z.infer<typeof companySchema>) {
    const user = await requireUser();

    const req = await request();

    const decision = await aj.protect(req);

    if (decision.isDenied()) {
        throw new Error("Forbidden")
    }

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

    const req = await request();

    const decision = await aj.protect(req);

    if (decision.isDenied()) {
        throw new Error("Forbidden");
    }

  
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

export async function getCompany(userId: string) {
    const data = await prisma.company.findUnique({
      where: {
        userId: userId,
      },
      select: {
        name: true,
        location: true,
        about: true,
        logo: true,
        xAccount: true,
        website: true,
      },
    });
  
    if (!data) {
      return redirect("/");
    }
    return data;
  }
  