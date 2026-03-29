import { Link } from 'react-router';
import Card from '~/components/Card';
import Loading from '~/components/Loading';
import Errors from '~/components/Errors';
import useDetails from '~/hooks/useDetails';
import parseURL from '~/utils/parseURL';
import usePagination from '~/hooks/usePagination';
import Pagination from '~/components/Pagination';

interface Events {
  name: string;
  date: string;
  description: string;
  url: string;
}

const Events = () => {
  const {
    data: events,
    loading,
    error,
  } = useDetails<Events[]>({ resource: 'events' });

  const { currentPageItems, currentPage, totalPages, goToPage } = usePagination({
    items: events || [],
    itemsPerPage: 10,
  });


  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errors />
      ) : (
        <div className="bg-events min-h-screen p-4">
          <h2 className="mb-4 text-center text-2xl font-bold text-amber-400">
            Events
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentPageItems?.map((event) => (
              <Link
                to={`/${parseURL(event.url).resource}/${parseURL(event.url).id}`}
                key={event.url}
              >
                <Card
                  heading={event.name}
                  description={`Description: ${event.description} Date: ${event.date}`}
                />
              </Link>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
          />
        </div>
      )}
    </>
  );
};
export default Events;
