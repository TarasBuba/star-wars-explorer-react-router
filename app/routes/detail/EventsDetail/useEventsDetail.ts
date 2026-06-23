import { useParams } from 'react-router-dom';
import useAsync from '~/hooks/useAsync';
import type { Events, EventsDetails, Planets } from '~/types/types';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import { getAllEvents, getAllPlanets } from '~/api/StarWarsAPI';

export default function useCreatureDetail() {
  const { id } = useParams();
  const fetchEvent = () => StarWarsDetailsAPI('events', id || '');
  const { data: allDataLocation } = useAsync<Planets[]>(getAllPlanets);

  const { loading, error, data } = useAsync<EventsDetails>(fetchEvent, id);
  const fetchAllEvents = () => getAllEvents();
  const { data: allEvents } = useAsync<Events[]>(fetchAllEvents);

  return {
    loading,
    error,
    event: data,
    allEvents,
    allDataLocation,
  };
}
