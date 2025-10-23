import { useForm } from 'react-hook-form';
import Input from '@mui/material/Input';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import TextField  from '@mui/material/TextField'; 

const LoginForm = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      

      <div>
        <TextField
          label="Email"
          type="email"
          fullWidth
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
          type="password"
          fullWidth
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}   
        /> 
      </div>  

      <br></br>

    <Link
      component={RouterLink}
      to="/signup"
      underline="always"
      color="primary"
      sx={{ color: 'blue' }}
      className='cursor-pointer'
    >
      Not Registered? Click here.
    </Link>
      <br></br>
      <br></br>
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
        <Button
          type="submit"
          variant="contained"
          width='30px'
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;