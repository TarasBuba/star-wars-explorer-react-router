import Card from '~/components/Card';
import LinkResolved from '~/utils/link-resolved';
import type {
  StarshipsDetails,
  Characters,
  Organizations,
} from '~/types/types';

type Props = {
  starships: StarshipsDetails | null;
  allDataAffiliations: Organizations[] | null;
  allDataPilots: Characters[] | null;
};

const SpeciesDetailView = ({
  starships,
  allDataAffiliations,
  allDataPilots,
}: Props) => {
  return (
    <Card
      variant="detail"
      heading={starships?.name}
      image={starships?.image}
      fields={[
        { label: 'Model', value: starships?.model },
        { label: 'Manufacturer', value: starships?.manufacturer },
        { label: 'Cost in Credits', value: starships?.cost_in_credits },
        { label: 'Length', value: starships?.length },
        {
          label: 'Max Atmosphering Speed',
          value: starships?.max_atmosphering_speed,
        },
        { label: 'Crew', value: starships?.crew },
        { label: 'Passengers', value: starships?.passengers },
        { label: 'Cargo Capacity', value: starships?.cargo_capacity },
        { label: 'Consumables', value: starships?.consumables },
        { label: 'Hyperdrive Rating', value: starships?.hyperdrive_rating },
        { label: 'MGLT', value: starships?.MGLT },
        { label: 'Starship Class', value: starships?.starship_class },
        {
          label: 'Pilots',
          value: starships?.pilots?.map((pilot) => (
            <span key={pilot}>
              <LinkResolved
                key={pilot}
                value={pilot}
                resource="characters"
                matchKey="id"
                idKey="id"
                collection={allDataPilots || []}
              />
              {' | '}
            </span>
          )),
        },
        {
          label: 'Affiliations',
          value: starships?.affiliations?.map((affiliation) => (
            <span key={affiliation}>
              <LinkResolved
                key={affiliation}
                value={affiliation}
                resource="organizations"
                matchKey="name"
                idKey="id"
                collection={allDataAffiliations || []}
              />
              {' | '}
            </span>
          )),
        },
        {
          label: 'Armament',
          value: starships?.armament?.map((weapon, index) => (
            <span key={index}>
              {weapon}
              {' | '}
            </span>
          )),
        },
      ]}
    />
  );
};

export default SpeciesDetailView;
