import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import type { OrganizationsDetails, Planets, Characters } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';
import useAsync from '~/hooks/useAsync';
import { useCallback } from 'react';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import { getAllPlanets, getAllCharacters } from '~/api/StarWarsAPI';
import Card from '~/components/Card';

const OrganizationDetail = () => {
  const { id } = useParams();

  const fetchOrganizationDetails = useCallback(() => {
    return StarWarsDetailsAPI('organizations', id || '');
  }, [id]);

  const { data: allDataHeadquarters } = useAsync<Planets[]>(getAllPlanets);
  const { data: allDataLeader } = useAsync<Characters[]>(getAllCharacters);

  const {
    data: organization,
    loading,
    error,
  } = useAsync<OrganizationsDetails>(fetchOrganizationDetails);

  return (
    <DataWrapper loading={loading} error={error}>
      <Card
        heading={organization?.name}
        image={organization?.image}
        fields={[
          { label: 'Status', value: organization?.status },
          { label: 'Type', value: organization?.type },
          { label: 'Founding Date', value: organization?.founding_date },
          { label: 'Dissolution Date', value: organization?.dissolution_date },
          { label: 'Refounded Date', value: organization?.refounded_date },
          { label: 'Ideology', value: organization?.ideology },
          { label: 'Force Alignment', value: organization?.force_alignment },
          {
            label: 'Headquarters',
            value: (
              <LinkResolved
                key={organization?.headquarters_id}
                value={organization?.headquarters_id}
                resource="planets"
                idKey="id"
                matchKey="id"
                collection={allDataHeadquarters || []}
              />
            ),
          },
          {
            label: 'Leader',
            value: (
              <LinkResolved
                value={organization?.leader_id}
                resource="characters"
                idKey="id"
                matchKey="id"
                collection={allDataLeader || []}
              />
            ),
          },
          {
            label: 'Notable Members',
            value: organization?.notable_members.map((member, index) => (
              <LinkResolved
                key={index}
                value={member}
                resource="characters"
                idKey="id"
                matchKey="id"
                collection={allDataLeader || []}
              />
            )),
          },
          { label: 'Era', value: organization?.era.join(', ') },
          { label: 'Canon', value: organization?.canon ? 'Yes' : 'No' },
        ]}
      />
    </DataWrapper>
  );
};
export default OrganizationDetail;
