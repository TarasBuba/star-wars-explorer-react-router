import { Link } from 'react-router';
import Card from '~/components/Card';
import parseURL from '~/utils/parseURL';
import usePagination from '~/hooks/usePagination';
import Pagination from '~/components/Pagination';
import type { Planets } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';
import useAsync from '~/hooks/useAsync';
import StarWarsListAPI from '~/api/StarWarsListAPI';

const Planets = () => {
  const fetchPlanets = () => {
    return StarWarsListAPI('planets');
  };
  const { data: planets, loading, error } = useAsync<Planets[]>(fetchPlanets);
  const { currentPageItems, currentPage, totalPages, goToPage } = usePagination(
    {
      items: planets || [],
      itemsPerPage: 10,
    }
  );

  return (
    <DataWrapper loading={loading} error={error}>
      <div className="bg-planets min-h-screen p-4">
        <h2 className="mb-4 text-center text-2xl font-bold text-amber-500">
          Planets
        </h2>
        <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-2">
          {currentPageItems?.map((planet: Planets) => (
            <Link
              to={`/${parseURL(planet.url).resource}/${parseURL(planet.url).id}`}
              key={planet.name}
            >
              <Card
                heading={planet.name}
                image={planet.image}
                fields={[
                  { label: 'Climate', value: planet.climate },
                  { label: 'Terrain', value: planet.terrain },
                  { label: 'Population', value: planet.population },
                ]}
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
    </DataWrapper>
  );
};

export default Planets;
