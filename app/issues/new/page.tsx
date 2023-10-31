'use client';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextField } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter();
    const {register, control, handleSubmit} = useForm<IssueForm>();
    console.log(register('title'));

    return (
        <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async  (data) => {
            await axios.post('/api/issues', data).catch((error) => {console.log(error.toJSON())});
            router.push('/issues');
        })}>
            <TextField.Root>
                <TextField.Input placeholder="Title" {...register('title')}/>
            </TextField.Root>
            <Controller name="description" control={control} render={({field}) => 
                <SimpleMDE placeholder="Description" {...field} />
            } />
            <Button>Submit New Issue</Button>
        </form>
    )
}

export default NewIssuePage