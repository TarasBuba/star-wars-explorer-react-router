import Card from '../../../components/Card';
import LinkResolved from '~/utils/link-resolved';
import type { PlanetsDetails, Organizations, Species } from '~/types/types';

type Props = {
  planet: PlanetsDetails | undefined;
  allDataAffiliated: Organizations[] | undefined;
  allDataSpecies: Species[] | undefined;
};
const PlanetsDetailView = ({
  planet,
  allDataAffiliated,
  allDataSpecies,
}: Props) => {
  return (
    <Card
      heading={planet?.name}
      image={planet?.image}
      fields={[
        { label: 'Diameter', value: planet?.diameter },
        { label: 'Climate', value: planet?.climate },
        { label: 'Population', value: planet?.population },
        { label: 'Terrain', value: planet?.terrain },
        { label: 'Rotation Period', value: planet?.rotation_period },
        { label: 'Orbital Period', value: planet?.orbital_period },
        {
          label: 'Affiliations',
          value: planet?.affiliation.map((affiliation) => (
            <span>
              <LinkResolved
                key={affiliation}
                value={affiliation}
                resource="organizations"
                idKey="id"
                matchKey="name"
                collection={allDataAffiliated || []}
              />
              {' | '}
            </span>
          )),
        },
        {
          label: 'Notable Locations',
          value: planet?.notable_locations.map((location) => (
            <span>
              {location}
              {' | '}
            </span>
          )),
        },
        {
          label: 'Native Species',
          value: planet?.native_species.map((species) => (
            <span>
              <LinkResolved
                key={species}
                value={species}
                resource="species"
                idKey="id"
                matchKey="id"
                collection={allDataSpecies || []}
              />
              {' | '}
            </span>
          )),
        },
      ]}
    />
  );
};

export default PlanetsDetailView;
