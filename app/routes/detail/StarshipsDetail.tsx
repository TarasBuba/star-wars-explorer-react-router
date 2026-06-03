import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import DataWrapper from '~/components/DataWrapper';
import type {
  StarshipsDetails,
  Characters,
  Organizations,
} from '~/types/types';
import { useCallback } from 'react';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import useAsync from '~/hooks/useAsync';
import { getAllCharacters, getAllOrganizations } from '~/api/StarWarsAPI';
import Card from '~/components/Card';

export default function StarshipsDetail() {
  const { id } = useParams();

  const fetchStarshipDetails = useCallback(() => {
    return StarWarsDetailsAPI('starships', id || '');
  }, [id]);

  const { data: allDataAffiliations } =
    useAsync<Organizations[]>(getAllOrganizations);
  const { data: allDataPilots } = useAsync<Characters[]>(getAllCharacters);

  const {
    data: starships,
    loading,
    error,
  } = useAsync<StarshipsDetails>(fetchStarshipDetails);

  return (
    <DataWrapper loading={loading} error={error}>
      <Card
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
    </DataWrapper>
  );
}
