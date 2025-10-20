// EventRegistrationForm.jsx
import * as React from 'react';
import { Form, useForm } from 'react-hook-form';
import Input from '@mui/material/Input';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';


const EventRegistrationForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data); // TODO: Handle form submission

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-[350px] gap-5  p-5 '>
            <FormLabel className='text-center'>New Event Registration</FormLabel>
            <br></br>
            <Input type="text" placeholder="Title" {...register("Event Title", { required: true, maxLength: 30 })} />
            <Select defaultValue="" displayEmpty
                renderValue={(selected) => {
                    return selected === "" ? "Event Type" : selected;
                }} {...register("Event Type", { required: true })} className='h-9'>
                <MenuItem value="" disabled>
                    Event Type
                </MenuItem>
                <MenuItem value="Concert">Concert</MenuItem>
                <MenuItem value="Webinar">Webinar</MenuItem>
                <MenuItem value="Conference">Conference</MenuItem>
                <MenuItem value="Workshop">Workshop</MenuItem>
            </Select>
            <Input type="text" placeholder="Description" {...register("Description", { required: true, maxLength: 50 })} />
            <Input type="text" placeholder="Location" {...register("Location", { required: true, maxLength: 30 })} />
            <Input type="date" placeholder="Date" {...register("Date", { required: true })} />
            <Input type="time" placeholder="Time" {...register("Time", { required: true })} />
            <Input type="number" placeholder="Total seats" {...register("Total Seats", { required: true })} />

            <div className='text-center'>
                <Button type="submit" className='item-center border w-[100px] border-black rounded-xl'>Submit</Button>
            </div>
        </form>
    );
}

export default EventRegistrationForm;
