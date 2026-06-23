import LinkResolved from '~/utils/link-resolved';
import type { EventsDetails, Planets } from '~/types/types';
import Card from '~/components/Card';

type Props = {
  event: EventsDetails;
  allDataLocation: Planets[];
};

const EventsDetailView = ({ event, allDataLocation }: Props) => {
  return (
    <Card
      heading={event?.name}
      image={event.image}
      fields={[
        { label: 'Date', value: event?.date },
        { label: 'Type', value: event?.type },
        {
          label: 'Location',
          value: (
            <LinkResolved
              idKey="url"
              matchKey="url"
              collection={allDataLocation || []}
              resource="planets"
              value={event?.location_id}
            />
          ),
        },
        { label: 'Description', value: event?.description },
        { label: 'Participants', value: event?.participants?.join(', ') },
        {
          label: 'Organizations Involved',
          value: event?.organizations_involved?.map((org) => (
            <span>
              <LinkResolved
                key={org}
                value={org}
                resource="organizations"
                idKey="id"
                matchKey="id"
                collection={allDataLocation || []}
              />
              {' | '}
            </span>
          )),
        },
        { label: 'Casualties', value: event?.casualties },
      ]}
    />
  );
};

export default EventsDetailView;
