// EventRegistrationForm.jsx
import { useForm, Controller } from 'react-hook-form';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';


const EventRegistrationForm = ({ title, description, date, time, location, available_seats, event_type, onSubmit, loading }) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title,
            description,
            date,
            time,
            location,
            available_seats,
            event_type: event_type || '',
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <TextField
                    label="Event Title"
                    fullWidth
                    type="text"
                    {...register("title", { required: "Title is required", maxLength: 30 })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                />
            </div>

            <div>
                <Controller
                    name="event_type"
                    control={control}
                    rules={{ required: "Event type is required" }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            fullWidth
                            displayEmpty
                            error={!!errors.event_type}
                        >
                            <MenuItem value="" disabled>Select Event Type</MenuItem>
                            <MenuItem value="Concert">Concert</MenuItem>
                            <MenuItem value="Webinar">Webinar</MenuItem>
                            <MenuItem value="Conference">Conference</MenuItem>
                            <MenuItem value="Workshop">Workshop</MenuItem>
                        </Select>
                    )}
                />
            </div>

            <div>
                <TextField
                    label="Description"
                    fullWidth
                    type="text"
                    {...register("description", { required: "Description is required", maxLength: 50 })}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />
            </div>

            <div>
                <TextField
                    label="Location"
                    fullWidth
                    type="text"
                    {...register("location", { required: "Location is required", maxLength: 30 })}
                    error={!!errors.location}
                    helperText={errors.location?.message}
                />
            </div>

            <div>
                <TextField
                    fullWidth
                    type="date"
                    {...register("date", { required: "Date is required" })}
                    error={!!errors.description}
                    helperText={errors.date?.message}
                />
            </div>

            <div>
                <TextField
                    fullWidth
                    type="time"
                    {...register("time", { required: "Time is required" })}
                    error={!!errors.time}
                    helperText={errors.time?.message}
                />
            </div>
            {available_seats !== undefined ? null : (
                <div>
                    <TextField
                        label="Total Seats"
                        fullWidth
                        type="number"
                        {...register("available_seats", { required: "Total seats are required" })}
                        error={!!errors.available_seats}
                        helperText={errors.available_seats?.message}
                    />
                </div>
            )}


            <div className="flex justify-between space-x-4">
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
                <Button
                    type="button"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{ backgroundColor: 'red' }}
                    onClick={() => navigate('/dashboard')}
                >
                    Cancel
                </Button>
            </div>
        </form>

    );
}

export default EventRegistrationForm;
