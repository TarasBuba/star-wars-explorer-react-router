import { useParams } from 'react-router';
import useDetails from '~/hooks/useDetails';
import useList from '~/hooks/useList';
import LinkResolved from '~/utils/link-resolved';
import type { EventsDetails, Planets } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';

const EventsDetail = () => {
  const { id } = useParams();
  const allDataLocation = useList<Planets[]>({
    resource: 'planets',
  });

  const {
    data: event,
    loading,
    error,
  } = useDetails<EventsDetails>({
    resource: 'events',
    id: id,
  });

  return (
    <DataWrapper loading={loading} error={error}>
      <div className="bg-events min-h-screen p-4">
        <h2 className="mb-4 text-center text-2xl font-bold text-amber-400">
          {event?.name}
        </h2>
        <div>
          <p>Date: {event?.date}</p>
          <p>Type: {event?.type}</p>
          <p>
            Location:
            <LinkResolved
              key={event?.url}
              idKey="url"
              matchKey="url"
              collection={allDataLocation.data || []}
              resource="planets"
              value={event?.location_id}
            />
          </p>
          <p>Description: {event?.description}</p>
          <p>Participants: {event?.participants?.join(', ')}</p>
          <p>
            Organizations Involved: {event?.organizations_involved?.join(', ')}
          </p>
          <p>Casualties: {event?.casualties}</p>
        </div>
      </div>
    </DataWrapper>
  );
};

export default EventsDetail;
