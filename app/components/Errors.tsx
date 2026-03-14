const Error = ({ message }: { message: string }) => {
  return (
    <div className="text-center text-lg text-red-500">Error: {message}</div>
  );
};

export default Error;
