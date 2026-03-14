interface CardProps {
  heading: string;
  description: string;
}

const Card = ({ description, heading }: CardProps) => {
  return (
    <div className="mb-4 rounded-lg border p-4 text-amber-500 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
      <h2 className="mb-2 text-2xl font-bold">{heading}</h2>
      {description && <p className="mb-2">{description}</p>}
    </div>
  );
};

export default Card;
