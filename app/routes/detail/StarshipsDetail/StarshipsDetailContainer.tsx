import DataWrapper from '~/components/DataWrapper';
import StarshipsDetailView from './StarshipsDetailView';
import useStarshipsDetail from './useStarshipsDetail';

const StarshipsDetailContainer = () => {
  const { starships, allDataAffiliations, allDataPilots, loading, error } =
    useStarshipsDetail();

  return (
    <DataWrapper loading={loading} error={error}>
      <StarshipsDetailView
        starships={starships ?? null}
        allDataAffiliations={allDataAffiliations ?? null}
        allDataPilots={allDataPilots ?? null}
      />
    </DataWrapper>
  );
};

export default StarshipsDetailContainer;
