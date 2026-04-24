import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import type { OrganizationsDetails, Planets, Characters } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';
import useAsync from '~/hooks/useAsync';
import { useCallback } from 'react';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import StarWarsListAPI from '~/api/StarWarsListAPI';

const OrganizationDetail = () => {
  const { id } = useParams();

  const fetchOrganizationDetails = useCallback(() => {
    return StarWarsDetailsAPI('organizations', id || '');
  }, [id]);

  const fetchHeadquarters = useCallback(() => {
    return StarWarsListAPI('planets');
  }, []);
  const fetchLeader = useCallback(() => {
    return StarWarsListAPI('characters');
  }, []);
  const { data: allDataHeadquarters } = useAsync<Planets[]>(fetchHeadquarters);
  const { data: allDataLeader } = useAsync<Characters[]>(fetchLeader);

  const {
    data: organization,
    loading,
    error,
  } = useAsync<OrganizationsDetails>(fetchOrganizationDetails);

  return (
    <DataWrapper loading={loading} error={error}>
      <div className="bg-organizations min-h-screen p-4">
        <h2 className="mb-4 text-center text-2xl font-bold text-amber-400">
          {organization?.name}
        </h2>
        <div>
          <p>Type: {organization?.type}</p>
          <p>Founding Date: {organization?.founding_date}</p>
          <p>Dissolution Date: {organization?.dissolution_date}</p>
          <p>Refounded Date: {organization?.refounded_date}</p>
          <p>Ideology: {organization?.ideology}</p>
          <p>Force Alignment: {organization?.force_alignment}</p>
        </div>
        <div>
          <p>
            Headquarters: (
            <LinkResolved
              key={organization?.headquarters_id}
              value={organization?.headquarters_id}
              resource="planets"
              idKey="id"
              matchKey="id"
              collection={allDataHeadquarters || []}
            />
            )
          </p>
          <p>
            Leader:
            <span>
              <LinkResolved
                value={organization?.leader_id}
                resource="characters"
                idKey="id"
                matchKey="id"
                collection={allDataLeader || []}
              />
            </span>
          </p>
          <div>
            <p>Notable Members:</p>
            <ul>
              {organization?.notable_members.map((member, index) => (
                <li key={index}>
                  <LinkResolved
                    value={member}
                    resource="characters"
                    idKey="id"
                    matchKey="id"
                    collection={allDataLeader || []}
                  />
                </li>
              ))}
            </ul>
          </div>
          <p>Era: {organization?.era.join(', ')}</p>
        </div>
        <p>Status: {organization?.status}</p>
        <p>Canon: {organization?.canon ? 'Yes' : 'No'}</p>
      </div>
    </DataWrapper>
  );
};
export default OrganizationDetail;
