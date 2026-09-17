import useDroidsDetail from './useDroidsDetail';
import DataWrapper from '~/components/DataWrapper';
import DroidsDetailView from './DroidsDetailView';

const DroidsDetailContainer = () => {
  const { loading, error, droids } = useDroidsDetail();

  return (
    <DataWrapper loading={loading} error={error}>
      <DroidsDetailView droids={droids ?? undefined} />
    </DataWrapper>
  );
};

export default DroidsDetailContainer;
