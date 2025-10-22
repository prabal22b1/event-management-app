import { useForm } from 'react-hook-form';
import Input from '@mui/material/Input';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const SignUpForm = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <FormLabel>Username</FormLabel>
        <Input
          fullWidth
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
        />
      </div>

      <div>
        <FormLabel>Name</FormLabel>
        <Input
          fullWidth
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
        />
      </div>

      <div>
        <FormLabel>Email</FormLabel>
        <Input
          fullWidth
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          error={!!errors.email}
        />
      </div>

      <div>
        <FormLabel>Password</FormLabel>
        <Input
          fullWidth
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters"
            }
          })}
          error={!!errors.password}
        />
      </div>

      <div>
        <FormLabel>Role</FormLabel>
        <Select
          fullWidth
          defaultValue="Attendee"
          {...register("role", { required: "Role is required" })}
        >
          <MenuItem value="Attendee">Attendee</MenuItem>
          <MenuItem value="Organizer">Organizer</MenuItem>
        </Select>
      </div>
      <br></br>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button
          width='30px'
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;