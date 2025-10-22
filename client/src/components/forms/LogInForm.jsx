import { useForm } from 'react-hook-form';
import Input from '@mui/material/Input';
import { Link } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
        />
      </div>
      <br></br>
       <Link style = {{marginTop: '10px', marginBottom: '10px'}} component="button" variant="body2" onClick={() => navigate('/signup')}>
        Not Registered? Click here to sign up.
      </Link>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button
          type="submit"
          variant="contained"
          width = '30px'
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        </div>
    </form>
  );
};

export default LoginForm;