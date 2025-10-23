import { useForm } from 'react-hook-form';
import Input from '@mui/material/Input';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

import TextField  from '@mui/material/TextField'; 

const SignUpForm = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      
      <div>
        <TextField
          label="Username"
          type="text"
          fullWidth
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors.username?.message}   
        />
      </div>

      <div>
        <TextField
          label="Name"
          type="text"
          fullWidth
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name?.message}   
        />
      </div>
      
      
      <div>
        <TextField
          label="Email"
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
          helperText={errors.email?.message}   
        />  
      </div>


      <div>
        <TextField
          label="Password"
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
          helperText={errors.password?.message}   
        />  
      </div>
      <div>
        <TextField
          label="Role"
          fullWidth
          select
          defaultValue="Attendee"
          {...register("role", { required: "Role is required" })}
          error={!!errors.role}
          helperText={errors.role?.message}   
        >
          <MenuItem value="Attendee">Attendee</MenuItem>
          <MenuItem value="Organizer">Organizer</MenuItem>
        </TextField>
      </div>

      <br></br>
      <Link
        component={RouterLink}
        to="/login"
        underline="always"
        color="primary"
        sx={{ color: 'blue' }}
        className='cursor-pointer'
      >
        Already Registered? Click here to Login
      </Link>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
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