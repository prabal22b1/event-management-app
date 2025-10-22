import axios from 'axios';

const api= axios.create({
  baseURL:'http://localhost:8000/api/v1/',
  withCredentials: true, // Include cookies in requests
  headers: {
    'Content-Type': 'application/json',
  },    
});

api.interceptors.request.use(config => {
  // You can add additional headers or modify the request here if needed
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(response => {
  return response;
},async(error) => {
  const originalRequest = error.config;

  // If the error is 401 Unauthorized, try to refresh the token
  if (error.response && error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
     const refreshResponse= await axios.post('http://localhost:8000/api/v1/token/refresh/', {}, 
        { withCredentials: true });
      return api(originalRequest); // Retry the original request
    }catch (refreshError) {
        console.log('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
    }
  }
    return Promise.reject(error);
});

export default api;