import { useForm } from 'react-hook-form';
import Input from '@mui/material/Input';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

const LoginForm = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

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

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};

export default LoginForm;