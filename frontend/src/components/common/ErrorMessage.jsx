const ErrorMessage = ({ message = "Something went wrong." }) => {
  return (
    <div className="error-state" role="alert">
      <div className="error-icon">!</div>
      <div>
        <h3>Something went wrong</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;