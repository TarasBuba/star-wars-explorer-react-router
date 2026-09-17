import DataWrapper from '~/components/DataWrapper';
import VehiclesDetailView from './VehiclesDetailView';
import useVehiclesDetail from './useVehiclesDetail';

const VehiclesDetailContainer = () => {
  const { vehicles, allDataOrganizations, loading, error } =
    useVehiclesDetail();

  return (
    <DataWrapper loading={loading} error={error}>
      <VehiclesDetailView
        vehicles={vehicles ?? null}
        allDataOrganizations={allDataOrganizations ?? null}
      />
    </DataWrapper>
  );
};

export default VehiclesDetailContainer;
