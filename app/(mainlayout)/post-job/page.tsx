import { getCompany } from '@/app/actions';
import { requireUser } from '@/app/utils/hooks'
import React from 'react'
import Image from 'next/image';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { companies, testimonials, stats } from '@/app/utils/data'
import CreateJobForm from '@/components/forms/CreateJobForm';


const PostJob = async () => {
    const session = await requireUser();
    const data = await getCompany(session.id as string)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
        <CreateJobForm
            companyAbout={data.about}
            companyLocation={data.location}
            companyLogo={data.logo}
            companyName={data.name}
            companyXAccount={data.xAccount}
            companyWebsite={data.website}
        />
        <div className="col-span-1">
            <Card className="lg:sticky lg:top-4">
            <CardHeader>
                <CardTitle className="text-xl">
                    Trusted by Industry Leaders
                </CardTitle>
                <CardDescription>
                    Join thousands of companies hiring top talent
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Company Logos */}
                <div className="grid grid-cols-3 gap-4">
                    {companies.map((company) => (
                        <div
                            key={company.id}
                            className="flex items-center justify-center"
                        >
                            <Image
                                src={company.logo}
                                alt={company.name}
                                height={80}
                                width={80}
                                className="opacity-75 transition-opacity hover:opacity-100 rounded-lg"
                            />{" "}
                        </div>
                    ))}
                </div>

                {/* Testimonials */}
                <div className="space-y-4">
                    {testimonials.map((testimonial, index) => (
                        <blockquote
                            key={index}
                            className="border-l-2 border-primary pl-4"
                        >
                            <p className="text-sm italic text-muted-foreground">
                                "{testimonial.quote}"
                            </p>
                            <footer className="mt-2 text-sm font-medium">
                                - {testimonial.author}, {testimonial.company}
                            </footer>
                        </blockquote>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="rounded-lg bg-muted p-4">
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            </Card>
        </div>
    </div>
  )
}

export default PostJob