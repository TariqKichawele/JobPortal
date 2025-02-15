import { inngest } from "./client";
import { prisma } from "../db";

export const handleJobExpiration = inngest.createFunction(
    { id: "job-expiration" },
    { event: "job/created" },
    async ({ event, step }) => {
        const { jobId, expirationDays } = event.data;

        await step.sleep("wait-for-expiration", `${expirationDays}d`);

        await step.run("update-job-status", async () => {
            await prisma.jobPost.update({
                where: { id: jobId },
                data: { status: "EXPIRED" }
            })
        });

        return { jobId, message: "Job marked as expired" };
    }
)