import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import Card from '~/components/Card';
// import MainLayout from "~/components/layout/MainLayout";
import useDetails from '~/hooks/useDetails';
import parseURL from '~/utils/parseURL';
import Loading from '~/components/Loading';
import Errors from '~/components/Errors';
import usePagination from '~/hooks/usePagination';
import Pagination from '~/components/Pagination';

interface Films {
  title: string;
  episode_id: number;
  url: string;
}

const Films = () => {
  const {
    data: films,
    loading,
    error,
  } = useDetails<Films[]>({ resource: 'films' });
  const { currentPageItems, currentPage, totalPages, goToPage } = usePagination(
    {
      items: films || [],
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
        <div className="bg-films min-h-screen p-4 text-amber-500">
          <h2 className="mb-4 text-center text-2xl font-bold">Films</h2>

          {currentPageItems?.map((film: Films) => (
            <Link
              to={`/${parseURL(film.url).resource}/${parseURL(film.url).id}`}
              key={film.episode_id}
            >
              <Card
                heading={film.title}
                description={`Episode ${film.episode_id} `}
              />
            </Link>
          ))}
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

export default Films;
