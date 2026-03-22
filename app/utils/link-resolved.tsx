import { Link } from 'react-router';
const LinkResolved = ({
  value,
  resource,
  collection,
  idKey,
  matchKey,
}: {
  value: any;
  resource: string;
  idKey: string;
  matchKey: string;
  collection: any[];
}) => {
  const item = collection.find((item) => item[matchKey] === value);

  return item ? (
    <Link
      to={`/${resource}/${item[idKey]}`}
      className="text-blue-500 hover:underline"
    >
      {item.name ?? value}
    </Link>
  ) : (
    <span>{value}</span>
  );
};

export default LinkResolved;
