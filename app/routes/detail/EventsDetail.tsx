import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import type { EventsDetails, Planets } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import { useCallback } from 'react';
import useAsync from '~/hooks/useAsync';
import Card from '~/components/Card';
import { getAllPlanets } from '~/api/StarWarsAPI';

const EventsDetail = () => {
  const { id } = useParams();

  const fetchEvent = useCallback(() => {
    return StarWarsDetailsAPI('events', id || '');
  }, [id]);

  const { data: allDataLocation } = useAsync<Planets[]>(getAllPlanets);

  const { data: event, loading, error } = useAsync<EventsDetails>(fetchEvent);

  return (
    <DataWrapper loading={loading} error={error}>
      <Card
        heading={event?.name}
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
    </DataWrapper>
  );
};

export default EventsDetail;
