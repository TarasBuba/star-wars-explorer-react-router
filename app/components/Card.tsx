type CardProps = {
  heading: string;
  fields: { label: string; value: string }[];
};

const Card = ({ heading, fields }: CardProps) => {
  return (
    <div className="mb-4 rounded-lg border p-4 text-amber-500 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
      <h2 className="mb-2 text-2xl font-bold">{heading}</h2>
      {fields?.map((field) => (
        <p key={field.label} className="mb-1 text-sm">
          <strong>{field.label}:</strong> {field.value}
        </p>
      ))}
    </div>
  );
};

export default Card;
