import Card from '~/components/Card';
import LinkResolved from '~/utils/link-resolved';
import type { Characters, Planets, OrganizationsDetails } from '~/types/types';

type Props = {
  organization: OrganizationsDetails | undefined;
  allDataHeadquarters: Planets[] | undefined;
  allDataLeader: Characters[] | undefined;
};
const OrganizationDetailView = ({
  organization,
  allDataHeadquarters,
  allDataLeader,
}: Props) => {
  return (
    <Card
      variant="detail"
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
  );
};

export default OrganizationDetailView;
