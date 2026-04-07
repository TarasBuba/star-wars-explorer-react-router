import { useParams } from 'react-router';
import Loading from '~/components/Loading';
import Errors from '~/components/Errors';
import useDetails from '~/hooks/useDetails';
import LinkResolved from '~/utils/link-resolved';
import type {
  WeaponsDetails,
  Characters,
  Organizations,
  Planets,
  Films,
} from '~/types/types';

const WeaponsDetail = () => {
  const { id } = useParams();
  const allDataOwner = useDetails<Characters[]>({
    resource: 'characters',
  });
  const allDataCurrentOwner = useDetails<Characters[]>({
    resource: 'characters',
  });
  const allDataCrystalOrigin = useDetails<Planets[]>({
    resource: 'planets',
  });
  const allDataFirstAppearance = useDetails<Films[]>({
    resource: 'films',
  });
  const allDataAffiliations = useDetails<Organizations[]>({
    resource: 'organizations',
  });

  const {
    data: weapon,
    loading,
    error,
  } = useDetails<WeaponsDetails>({ resource: 'weapons', id: id });

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errors message={error} />
      ) : (
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
              collection={allDataOwner?.data || []}
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
              collection={allDataCurrentOwner?.data || []}
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
              collection={allDataCrystalOrigin?.data || []}
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
                  collection={allDataAffiliations?.data || []}
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
              collection={allDataFirstAppearance?.data || []}
              resource="films"
              value={weapon?.first_appearance_film_id}
            />
          </p>
          <p>Canonicity: {weapon?.canon ? 'Canon' : 'Non-Canon'}</p>
        </div>
      )}
    </>
  );
};

export default WeaponsDetail;
