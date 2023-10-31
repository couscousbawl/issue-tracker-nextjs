'use client';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Callout, TextField } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from 'zod';
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import Link from 'next/link';

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
    const router = useRouter();
    const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setSubmitting(false);
            setError('Unexpected error.');
        }
    });

    return (
        <div className='max-w-xl space-y-3'>
            { error && 
                <Callout.Root color="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            }
            <form onSubmit={onSubmit} >
                <TextField.Root className="mb-5">
                    <TextField.Input placeholder="Title" {...register('title')} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller name="description" control={control} render={({ field }) =>
                    <SimpleMDE placeholder="Description" {...field} />
                } />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <div className="cursor-pointer">
                    <Link href='#' onClick={onSubmit} aria-disabled={isSubmitting}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Submit New Issue {isSubmitting && <Spinner />}
                    </Link>
                </div>
            </form>
        </div>
       
    )
}

export default NewIssuePage