// EventRegistrationForm.jsx
import * as React from 'react';
import { Form, useForm } from 'react-hook-form';
import Input from '@mui/material/Input';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';


const EventRegistrationForm = ({ onSubmit, loading }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormLabel className="text-center">New Event Registration</FormLabel>

            <div>
                <FormLabel>Event Title</FormLabel>
                <Input
                    fullWidth
                    type="text"
                    {...register("Event Title", { required: "Title is required", maxLength: 30 })}
                    error={!!errors["Event Title"]}
                />
            </div>

            <div>
                <FormLabel>Event Type</FormLabel>
                <Select
                    fullWidth
                    defaultValue=""
                    displayEmpty
                    {...register("Event Type", { required: "Event type is required" })}
                    error={!!errors["Event Type"]}
                >
                    <MenuItem value="" disabled>Event Type</MenuItem>
                    <MenuItem value="Concert">Concert</MenuItem>
                    <MenuItem value="Webinar">Webinar</MenuItem>
                    <MenuItem value="Conference">Conference</MenuItem>
                    <MenuItem value="Workshop">Workshop</MenuItem>
                </Select>
            </div>

            <div>
                <FormLabel>Description</FormLabel>
                <Input
                    fullWidth
                    type="text"
                    {...register("Description", { required: "Description is required", maxLength: 50 })}
                    error={!!errors["Description"]}
                />
            </div>

            <div>
                <FormLabel>Location</FormLabel>
                <Input
                    fullWidth
                    type="text"
                    {...register("Location", { required: "Location is required", maxLength: 30 })}
                    error={!!errors["Location"]}
                />
            </div>

            <div>
                <FormLabel>Date</FormLabel>
                <Input
                    fullWidth
                    type="date"
                    {...register("Date", { required: "Date is required" })}
                    error={!!errors["Date"]}
                />
            </div>

            <div>
                <FormLabel>Time</FormLabel>
                <Input
                    fullWidth
                    type="time"
                    {...register("Time", { required: "Time is required" })}
                    error={!!errors["Time"]}
                />
            </div>

            <div>
                <FormLabel>Total Seats</FormLabel>
                <Input
                    fullWidth
                    type="number"
                    {...register("Total Seats", { required: "Total seats are required" })}
                    error={!!errors["Total Seats"]}
                />
            </div>

            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
            >
                {loading ? 'Submitting...' : 'Submit'}
            </Button>
        </form>

    );
}

export default EventRegistrationForm;
