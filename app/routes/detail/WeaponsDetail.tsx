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

const WeaponsDetail = () => {
  const { id } = useParams();

  const fetchWeaponDetails = useCallback(() => {
    return StarWarsDetailsAPI('weapons', id || '');
  }, [id]);

  const { data: allDataOwner } = useAsync<Characters[]>(getAllCharacters);
  // const allDataCurrentOwner = useAsync<Characters[]>(getAllCharacters);
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
      <div className="bg-weapons flex min-h-screen flex-col items-center justify-center gap-2 p-4">
        <h1 className="text-2xl">{weapon?.name}</h1>
        <p>Type: {weapon?.type}</p>
        <p>Manufacturer: {weapon?.manufacturer}</p>
        <p>Model: {weapon?.model}</p>
        <p>Range: {weapon?.range}</p>
        <p>
          Owner:
          <LinkResolved
            key={weapon?.owner_id}
            idKey="id"
            matchKey="id"
            collection={allDataOwner || []}
            resource="characters"
            value={weapon?.owner_id}
          />
        </p>
        <p>
          Current Owner:
          <LinkResolved
            key={weapon?.current_owner_id}
            idKey="id"
            matchKey="id"
            collection={allDataOwner || []}
            resource="characters"
            value={weapon?.current_owner_id}
          />
        </p>
        <p>Color: {weapon?.color}</p>
        <p>Crystal Type: {weapon?.crystal_type}</p>
        <p>
          Crystal Origin:
          <LinkResolved
            key={weapon?.crystal_origin_id}
            idKey="id"
            matchKey="id"
            collection={allDataCrystalOrigin || []}
            resource="planets"
            value={weapon?.crystal_origin_id}
          />
        </p>
        <p>Hilt Material: {weapon?.hilt_material}</p>
        <p>Blade Length: {weapon?.blade_length}</p>
        <p>Special Features: {weapon?.special_features.join(', ')}</p>
        <p>
          Affiliations:{' '}
          {weapon?.affiliations?.map((affiliation: string, index: number) => (
            <p key={index}>
              <LinkResolved
                key={affiliation}
                idKey="id"
                matchKey="name"
                collection={allDataAffiliations || []}
                resource="organizations"
                value={affiliation}
              />
            </p>
          )) || 'None'}
        </p>
        <p>
          First Appearance:
          <LinkResolved
            key={weapon?.first_appearance_film_id}
            idKey="id"
            matchKey="id"
            collection={allDataFirstAppearance || []}
            resource="films"
            value={weapon?.first_appearance_film_id}
          />
        </p>
        <p>Canonicity: {weapon?.canon ? 'Canon' : 'Non-Canon'}</p>
      </div>
    </DataWrapper>
  );
};

export default WeaponsDetail;
