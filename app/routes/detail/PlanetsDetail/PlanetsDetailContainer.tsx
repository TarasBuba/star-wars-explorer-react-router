import PlanetsDetailView from './PlanetsDetailView';
import usePlanetsDetail from './usePlanetsDetail';
import DataWrapper from '~/components/DataWrapper';

const PlanetsDetail = () => {
  const { planet, loading, error, allDataAffiliated, allDataSpecies } =
    usePlanetsDetail();

  return (
    <DataWrapper loading={loading} error={error}>
      <PlanetsDetailView
        planet={planet ?? undefined}
        allDataAffiliated={allDataAffiliated ?? undefined}
        allDataSpecies={allDataSpecies ?? undefined}
      />
    </DataWrapper>
  );
};

export default PlanetsDetail;
