import type React from 'react';

type CardProps = {
  heading: string | undefined;
  fields: { label: string; value: string | React.ReactNode }[];
  image: string | undefined;
};

const Card = ({ heading, fields, image }: CardProps) => {
  return (
    <div className="mb-4 flex items-center justify-between rounded-lg border border-amber-400 p-4 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg md:flex-row">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-amber-400">{heading}</h2>
        {fields?.map((field) => (
          <p key={field.label} className="mb-1 text-sm">
            <strong className="font-semibold text-gray-600">
              {field.label}:
            </strong>{' '}
            <span className="font-normal text-gray-800">{field.value}</span>
          </p>
        ))}
      </div>
      <div className="ml-4 aspect-video overflow-hidden rounded-lg">
        {image && <img src={image} alt={heading} className="h-60 w-96" />}
        {!image && (
          <img src="/noname.jpg" alt="Placeholder" className="h-72 w-96" />
        )}
      </div>
    </div>
  );
};

export default Card;
