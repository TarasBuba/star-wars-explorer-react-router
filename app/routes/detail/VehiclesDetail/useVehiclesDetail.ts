import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import { useParams } from 'react-router';
import { getAllOrganizations } from '~/api/StarWarsAPI';
import type { Organizations, VehiclesDetails } from '~/types/types';
import useAsync from '~/hooks/useAsync';

export default function useVehiclesDetail() {
  const { id } = useParams();

  const fetchVehicleDetails = () => StarWarsDetailsAPI('vehicles', id || '');

  const { data: allDataOrganizations } =
    useAsync<Organizations[]>(getAllOrganizations);

  const {
    data: vehicles,
    loading,
    error,
  } = useAsync<VehiclesDetails>(fetchVehicleDetails);
  return {
    vehicles,
    allDataOrganizations,
    loading,
    error,
  };
}
