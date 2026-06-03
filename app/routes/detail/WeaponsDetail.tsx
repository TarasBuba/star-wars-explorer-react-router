import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import DataWrapper from '~/components/DataWrapper';
import type {
  WeaponsDetails,
  Characters,
  Organizations,
  Planets,
  Films,
} from '~/types/types';
import { useCallback } from 'react';
import useAsync from '~/hooks/useAsync';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import {
  getAllCharacters,
  getAllOrganizations,
  getAllPlanets,
  getAllFilms,
} from '~/api/StarWarsAPI';
import Card from '~/components/Card';

const WeaponsDetail = () => {
  const { id } = useParams();

  const fetchWeaponDetails = useCallback(() => {
    return StarWarsDetailsAPI('weapons', id || '');
  }, [id]);

  const { data: allDataOwner } = useAsync<Characters[]>(getAllCharacters);
  const { data: allDataCrystalOrigin } = useAsync<Planets[]>(getAllPlanets);
  const { data: allDataFirstAppearance } = useAsync<Films[]>(getAllFilms);
  const { data: allDataAffiliations } =
    useAsync<Organizations[]>(getAllOrganizations);

  const {
    data: weapon,
    loading,
    error,
  } = useAsync<WeaponsDetails>(fetchWeaponDetails);

  return (
    <DataWrapper loading={loading} error={error}>
      <Card
        heading={weapon?.name}
        image={weapon?.image}
        fields={[
          { label: 'Type', value: weapon?.type },
          { label: 'Manufacturer', value: weapon?.manufacturer },
          { label: 'Model', value: weapon?.model },
          { label: 'Range', value: weapon?.range },
          {
            label: 'Owner',
            value: (
              <LinkResolved
                key={weapon?.owner_id}
                idKey="id"
                matchKey="id"
                collection={allDataOwner || []}
                resource="characters"
                value={weapon?.owner_id}
              />
            ),
          },
          {
            label: 'Current Owner',
            value: (
              <LinkResolved
                key={weapon?.current_owner_id}
                idKey="id"
                matchKey="id"
                collection={allDataOwner || []}
                resource="characters"
                value={weapon?.current_owner_id}
              />
            ),
          },
          { label: 'Color', value: weapon?.color },
          { label: 'Crystal Type', value: weapon?.crystal_type },
          {
            label: 'Crystal Origin',
            value: (
              <LinkResolved
                key={weapon?.crystal_origin_id}
                idKey="id"
                matchKey="id"
                collection={allDataCrystalOrigin || []}
                resource="planets"
                value={weapon?.crystal_origin_id}
              />
            ),
          },
          { label: 'Hilt Material', value: weapon?.hilt_material },
          { label: 'Blade Length', value: weapon?.blade_length },
          {
            label: 'Special Features',
            value: weapon?.special_features.join(', '),
          },
          {
            label: 'Affiliations',
            value:
              weapon?.affiliations?.map((affiliation) => (
                <span key={affiliation}>
                  <LinkResolved
                    key={affiliation}
                    idKey="id"
                    matchKey="name"
                    collection={allDataAffiliations || []}
                    resource="organizations"
                    value={affiliation}
                  />
                  {' | '}
                </span>
              )) || 'N/A',
          },
          {
            label: 'First Appearance',
            value: weapon?.first_appearance_film_id && (
              <LinkResolved
                key={weapon?.first_appearance_film_id}
                idKey="id"
                matchKey="id"
                collection={allDataFirstAppearance || []}
                resource="films"
                value={weapon?.first_appearance_film_id}
              />
            ),
          },
          { label: 'Canonicity', value: weapon?.canon ? 'Canon' : 'Non-Canon' },
        ]}
      />
    </DataWrapper>
  );
};

export default WeaponsDetail;
