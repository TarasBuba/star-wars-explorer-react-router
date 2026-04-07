import { Link } from 'react-router';
import Card from '~/components/Card';
import Loading from '~/components/Loading';
import Errors from '~/components/Errors';
import useDetails from '~/hooks/useDetails';
import parseURL from '~/utils/parseURL';
import usePagination from '~/hooks/usePagination';
import Pagination from '~/components/Pagination';
import type { Quotes } from '~/types/types';

const Quotes = () => {
  const {
    data: quotes,
    loading,
    error,
  } = useDetails<Quotes[]>({ resource: 'quotes' });

  const { currentPageItems, currentPage, totalPages, goToPage } = usePagination(
    {
      items: quotes || [],
      itemsPerPage: 10,
    }
  );

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errors message={error} />
      ) : (
        <div className="bg-quotes min-h-screen p-4">
          <h2 className="mb-4 text-center text-2xl font-bold text-amber-400">
            Quotes
          </h2>
          <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-2">
            {currentPageItems?.map((quote: Quotes) => (
              <Link
                to={`/${parseURL(quote.url).resource}/${parseURL(quote.url).id}`}
                key={quote.content}
              >
                <Card
                  key={quote.content}
                  heading={quote.content}
                  description={`Character ID: ${quote.character_id}, Film ID: ${quote.film_id}`}
                />
              </Link>
            ))}
          </section>
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

export default Quotes;
