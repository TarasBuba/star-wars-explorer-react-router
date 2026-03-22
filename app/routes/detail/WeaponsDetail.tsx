import { Link, useParams } from 'react-router';
import Loading from '~/components/Loading';
import Errors from '~/components/Errors';
import useDetails from '~/hooks/useDetails';
import LinkResolved from '~/utils/link-resolved';

interface Weapons {
  name: string;
  type: string;
  manufacturer: string;
  model: string;
  range: string;
  owner_id: number;
  current_owner_id: number;
  color: string;
  crystal_type: string;
  crystal_origin_id: number;
  hilt_material: string;
  blade_length: string;
  special_features: string[];
  affiliations: string[];
  first_appearance_film_id: number;
  canon: boolean;
}

const WeaponsDetail = () => {
  const { id } = useParams();
  const allDataOwner = useDetails<{ name: string; url: string }[]>({
    resource: 'characters',
  });
  const allDataCurrentOwner = useDetails<{ name: string; url: string }[]>({
    resource: 'characters',
  });
  const allDataCrystalOrigin = useDetails<{ name: string; url: string }[]>({
    resource: 'planets',
  });
  const allDataFirstAppearance = useDetails<{ name: string; url: string }[]>({
    resource: 'films',
  });
  const allDataAffiliations = useDetails<{ name: string; url: string }[]>({
    resource: 'organizations',
  });

  const {
    data: weapon,
    loading,
    error,
  } = useDetails<Weapons>({ resource: 'weapons', id: id });

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errors message={error} />
      ) : (
        <div className="bg-weapons flex min-h-screen flex-col items-center justify-center gap-2 p-4">
          <h1 className="text-2xl">{weapon.name}</h1>
          <p>Type: {weapon.type}</p>
          <p>Manufacturer: {weapon.manufacturer}</p>
          <p>Model: {weapon.model}</p>
          <p>Range: {weapon.range}</p>
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
          <p>Hilt Material: {weapon.hilt_material}</p>
          <p>Blade Length: {weapon.blade_length}</p>
          <p>Special Features: {weapon.special_features.join(', ')}</p>
          <p>
            Affiliations:{' '}
            {weapon?.affiliation?.map((affiliation: string, index: number) => (
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
          <p>Canonicity: {weapon.canon ? 'Canon' : 'Non-Canon'}</p>
        </div>
      )}
    </>
  );
};

export default WeaponsDetail;
