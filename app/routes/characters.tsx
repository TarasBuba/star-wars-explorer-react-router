import { Link } from 'react-router';
import { useState, useEffect } from 'react';
// import PeopleDetail from "./detail/PeopleDetail";
import Card from '~/components/Card';
import Loading from '~/components/Loading';
import Errors from '~/components/Errors';
import useDetails from '~/hooks/useDetails';
// import parseURL from '~/utils/parseURL';

interface Characters {
  name: string;
  height: string;
  birth_year: string;
  gender: string;
  id: number;
}

const Characters = () => {
  const {
    data: characters,
    loading,
    error,
  } = useDetails<Characters[]>({ resource: 'characters' });

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errors message={error} />
      ) : (
        <div className="bg-people min-h-screen p-4">
          <h2 className="mb-4 text-center text-2xl font-bold text-amber-500">
            People
          </h2>
          <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-2">
            {characters?.map((character: Characters) => (
              <Link to={`/characters/${character.id}`} key={character.name}>
                <div
                  key={character.name}
                  className="flex items-center justify-between rounded border border-amber-400 p-4 shadow"
                >
                  <Card
                    heading={character.name}
                    description={`Height: ${character.height}, Birth Year: ${character.birth_year}, Gender: ${character.gender}`}
                  />
                </div>
              </Link>
            ))}
          </section>
        </div>
      )}
    </>
  );
};

export default Characters;
