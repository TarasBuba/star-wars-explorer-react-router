import Card from '~/components/Card';
import LinkResolved from '~/utils/link-resolved';
import type { VehiclesDetails, Organizations } from '~/types/types';

type Props = {
  vehicles: VehiclesDetails | null;
  allDataOrganizations: Organizations[] | null;
};

const SpeciesDetailView = ({ vehicles, allDataOrganizations }: Props) => {
  return (
    <Card
      variant="detail"
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
  );
};

export default SpeciesDetailView;
