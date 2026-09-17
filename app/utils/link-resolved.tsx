import { Link } from 'react-router';

const LinkResolved = ({
  value,
  resource,
  collection,
}: {
  value: any;
  resource: string;
  idKey?: string;
  matchKey?: string;
  collection: any[];
}) => {
  if (!collection || !Array.isArray(collection)) {
    return <span>{value}</span>;
  }
  const item = collection.find(
    (c) => c.id == value || c.name === value || c.title === value
  );

  return item ? (
    <Link
      to={`/${resource}/${item.id}`}
      className="font-semibold text-[#4fc3f7] transition-colors hover:text-white hover:underline"
    >
      {item.name ?? item.title ?? value}
    </Link>
  ) : (
    <span>{value}</span>
  );
};

export default LinkResolved;
