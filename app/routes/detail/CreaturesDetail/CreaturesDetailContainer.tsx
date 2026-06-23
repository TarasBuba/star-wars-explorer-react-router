import useCreaturesDetail from './useCreaturesDetail';
import DataWrapper from '~/components/DataWrapper';
import CreaturesDetailView from './CreaturesDetailView';

const CreaturesDetailContainer = () => {
  const { loading, error, creature } = useCreaturesDetail();

  return (
    <DataWrapper loading={loading} error={error}>
      <CreaturesDetailView creature={creature ?? undefined} />
    </DataWrapper>
  );
};

export default CreaturesDetailContainer;
