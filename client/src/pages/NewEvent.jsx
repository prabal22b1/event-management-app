import EventRegistrationForm from "../components/forms/EventRegistrationForm"

const NewEvent = () => {
const handleSubmit = async (data) => {
    // Handle form submission logic here
    console.log("Form data submitted:", data);
  }

return (
    <div className="flex justify-center items-center p-16">
      <div className="p-8 bg-white rounded-lg shadow-md w-[500px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {successMessage && !error && (
          <Alert severity="success" className="mb-4">
            {successMessage}
          </Alert>
        )}
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        <EventRegistrationForm 
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default NewEvent