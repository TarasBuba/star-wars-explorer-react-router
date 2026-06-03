import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import type { VehiclesDetails, Organizations } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';
import { useCallback } from 'react';
import useAsync from '~/hooks/useAsync';
import { getAllOrganizations } from '~/api/StarWarsAPI';
import Card from '~/components/Card';

export default function VehiclesDetail() {
  const { id } = useParams();

  const fetchVehicleDetails = useCallback(() => {
    return StarWarsDetailsAPI('vehicles', id || '');
  }, [id]);

  const { data: allDataOrganizations } =
    useAsync<Organizations[]>(getAllOrganizations);

  const {
    data: vehicles,
    loading,
    error,
  } = useAsync<VehiclesDetails>(fetchVehicleDetails);

  return (
    <DataWrapper loading={loading} error={error}>
      <Card
        heading={vehicles?.name}
        image={vehicles?.image}
        fields={[
          { label: 'Model', value: vehicles?.model },
          { label: 'Manufacturer', value: vehicles?.manufacturer },
          { label: 'Cost in Credits', value: vehicles?.cost_in_credits },
          { label: 'Length', value: vehicles?.length },
          {
            label: 'Max Atmosphering Speed',
            value: vehicles?.max_atmosphering_speed,
          },
          { label: 'Crew', value: vehicles?.crew },
          { label: 'Passengers', value: vehicles?.passengers },
          { label: 'Cargo Capacity', value: vehicles?.cargo_capacity },
          { label: 'Vehicle Class', value: vehicles?.vehicle_class },
          { label: 'Armor', value: vehicles?.armor },
          {
            label: 'Affiliation',
            value:
              vehicles?.affiliation.map((affiliation, index) => (
                <span key={index}>
                  <LinkResolved
                    value={affiliation}
                    resource="organizations"
                    matchKey="name"
                    idKey="id"
                    collection={allDataOrganizations || []}
                  />
                </span>
              )) || 'N/A',
          },
          {
            label: 'Armament',
            value:
              vehicles?.armament.map((weapon, index) => (
                <span key={index}>{weapon}, </span>
              )) || 'N/A',
          },
        ]}
      />
    </DataWrapper>
  );
}
