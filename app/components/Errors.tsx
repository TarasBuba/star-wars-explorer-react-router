

const Error = ({ message }: { message: string }) => {
    return <div className="text-center text-red-500 text-lg">Error: {message}</div>;
}

export default Error;