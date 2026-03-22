import { Link } from 'react-router';
import Card from '~/components/Card';
import useDetails from '~/hooks/useDetails';
import parseURL from '~/utils/parseURL';
import Loading from '~/components/Loading';
import Errors from '~/components/Errors';

interface Organizations {
  name: string;
  type: string;
  force_alignment: string;
  status: string;
  url: string;
};

const Organization = () => {
  const {
    data: organizations,
    loading,
    error,
  } = useDetails<Organizations[]>({ resource: 'organizations' }) as {
    data: Organizations[];
    loading: boolean;
    error: string | null;
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errors message={error} />
      ) : (
        <div className="bg-organizations min-h-screen p-4">
          <h2 className="mb-4 text-center text-2xl font-bold text-amber-400">
            Organizations
          </h2>
          <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-2">
            {organizations?.map((organization: Organizations) => (
              <Link
                to={`/${parseURL(organization.url).resource}/${parseURL(organization.url).id}`}
                key={organization.name}
              >
                <Card
                  heading={organization.name}
                  description={`Type: ${organization.type}, Force Alignment: ${organization.force_alignment}, Status: ${organization.status}`}
                />
              </Link>
            ))}
          </section>
        </div>
      )}
    </>
  );
};
export default Organization;
