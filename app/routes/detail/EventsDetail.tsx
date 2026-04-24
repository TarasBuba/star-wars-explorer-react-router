import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import type { EventsDetails, Planets } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import StarWarsListAPI from '~/api/StarWarsListAPI';
import { useCallback } from 'react';
import useAsync from '~/hooks/useAsync';

const EventsDetail = () => {
  const { id } = useParams();

  const fetchEvent = useCallback(() => {
    return StarWarsDetailsAPI('events', id || '');
  }, [id]);

  const fetchAllLocations = useCallback(() => {
    return StarWarsListAPI('planets');
  }, []);
  const { data: allDataLocation } = useAsync<Planets[]>(fetchAllLocations);

  const { data: event, loading, error } = useAsync<EventsDetails>(fetchEvent);

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
              idKey="url"
              matchKey="url"
              collection={allDataLocation || []}
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
