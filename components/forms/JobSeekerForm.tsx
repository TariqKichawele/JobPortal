'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import PDFImage from '@/public/pdf.png'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { XIcon } from 'lucide-react'
import { jobSeekerSchema } from '@/app/utils/zodSchemas'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { toast } from 'sonner'
import { UploadDropzone } from '../general/UploadThingReExport'
import { createJobSeeker } from '@/app/actions'

const JobSeekerForm = () => {
    const [pending, setPending] = useState(false);

    const form = useForm<z.infer<typeof jobSeekerSchema>>({
        resolver: zodResolver(jobSeekerSchema),
        defaultValues: {
            name: '',
            about: '',
            resume: '',
        },
    });

    async function onSubmit(values: z.infer<typeof jobSeekerSchema>) {
        try {
            setPending(true);
            await createJobSeeker(values);
        } catch (error) {
            if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
                toast.error("Something went wrong")
            }
        } finally {
            setPending(false);
        }        
    };



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about yourself..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume (PDF)</FormLabel>
              <FormControl>
                <div>
                  {field.value ? (
                    <div className="relative w-fit">
                      <Image
                        src={PDFImage}
                        alt="Company Logo"
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 "
                        onClick={() => field.onChange("")}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <UploadDropzone
                      endpoint="resumeUploader"
                      onClientUploadComplete={(res) => {
                        field.onChange(res[0].url);
                        toast.success("Resume uploaded successfully!");
                      }}
                      onUploadError={() => {
                        toast.error("Something went wrong. Please try again.");
                      }}
                      className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Submitting..." : "Continue"}
        </Button>
      </form>
    </Form>
  )
}

export default JobSeekerForm