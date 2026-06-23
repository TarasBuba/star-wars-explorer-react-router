import useEventsDetail from './useEventsDetail';
import DataWrapper from '~/components/DataWrapper';
import EventsDetailView from './EventsDetailView';

const EventsDetailContainer = () => {
  const { loading, error, event, allDataLocation } = useEventsDetail();
  return (
    <DataWrapper loading={loading} error={error}>
      <EventsDetailView
        events={event ?? undefined}
        allDataLocation={allDataLocation ?? undefined}
      />
    </DataWrapper>
  );
};

export default EventsDetailContainer;
