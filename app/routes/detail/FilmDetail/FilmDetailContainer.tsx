import useFilmDetail from './useFilmDetail';
import DataWrapper from '~/components/DataWrapper';
import FilmDetailView from './FilmDetailView';

const FilmDetailContainer = () => {
  const {
    loading,
    error,
    film,
    allDataCharacters,
    allDataPlanets,
    allDataSpecies,
    allDataOrganizations,
  } = useFilmDetail();

  return (
    <DataWrapper loading={loading} error={error}>
      <FilmDetailView
        film={film ?? undefined}
        allDataCharacters={allDataCharacters ?? undefined}
        allDataPlanets={allDataPlanets ?? undefined}
        allDataSpecies={allDataSpecies ?? undefined}
        allDataOrganizations={allDataOrganizations ?? undefined}
      />
    </DataWrapper>
  );
};

export default FilmDetailContainer;
