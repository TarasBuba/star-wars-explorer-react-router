import { Link, useParams } from 'react-router';
import Card from '~/components/Card';
import Loading from '~/components/Loading';
import Errors from '~/components/Errors';
import useDetails from '~/hooks/useDetails';
import LinkResolved from '~/utils/link-resolved';

interface Events {
  name: string;
  date: string;
  type: string;
  location_id: string;
  description: string;
  participants: string[];
  organizations_involved: string[];
  casualties: string;
  outcome: string;
  significance: string;
  film_id: number;
  canon: boolean;
  url: string;
}

const EventsDetail = () => {
  const { id } = useParams();
  const allDataLocation = useDetails<{ name: string; url: string }[]>({
    resource: 'planets',
  });
  const allDataFilm = useDetails<{ title: string; url: string }[]>({
    resource: 'films',
  });
  const {
    data: event,
    loading,
    error,
  } = useDetails<Events>({
    resource: 'events',
    id: id,
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errors message={error} />
      ) : event ? (
        <div className="bg-events min-h-screen p-4">
          <h2 className="mb-4 text-center text-2xl font-bold text-amber-400">
            {event.name}
          </h2>
          <div>
            <p>Date: {event.date}</p>
            <p>Type: {event.type}</p>
            <p>
              Location:
              <LinkResolved
                key={event.url}
                idKey="url"
                matchKey="url"
                collection={allDataLocation.data || []}
                resource="planets"
                value={event.location_id}
              />
            </p>
            <p>Description: {event.description}</p>
            <p>Participants: {event.participants.join(', ')}</p>
            <p>
              Organizations Involved: {event.organizations_involved.join(', ')}
            </p>
            <p>Casualties: {event.casualties}</p>
          </div>
        </div>
      ) : (
        <p>Event not found.</p>
      )}
    </>
  );
};

export default EventsDetail;
