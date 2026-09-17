import DataWrapper from '~/components/DataWrapper';
import SpeciesDetailView from './SpeciesDetailView';
import useSpeciesDetail from './useSpeciesDetail';

const SpeciesDetailContainer = () => {
  const { loading, error, species, allDataHomeworld } = useSpeciesDetail();

  return (
    <DataWrapper loading={loading} error={error}>
      <SpeciesDetailView
        species={species}
        allDataHomeworld={allDataHomeworld}
      />
    </DataWrapper>
  );
};

export default SpeciesDetailContainer;
