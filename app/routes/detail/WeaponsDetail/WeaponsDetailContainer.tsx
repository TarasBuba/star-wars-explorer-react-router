import WeaponsDetailView from './WeaponsDetailView';
import useWeaponsDetail from './useWeaponsDetail';
import DataWrapper from '~/components/DataWrapper';

const WeaponsDetailContainer = () => {
  const {
    weapon,
    allDataOwner,
    allDataCurrentOwner,
    allDataCrystalOrigin,
    allDataFirstAppearance,
    allDataAffiliations,
    loading,
    error,
  } = useWeaponsDetail();
  return (
    <DataWrapper loading={loading} error={error}>
      <WeaponsDetailView
        weapon={weapon ?? null}
        allDataOwner={allDataOwner ?? null}
        allDataCurrentOwner={allDataCurrentOwner ?? null}
        allDataCrystalOrigin={allDataCrystalOrigin ?? null}
        allDataFirstAppearance={allDataFirstAppearance ?? null}
        allDataAffiliations={allDataAffiliations ?? null}
      />
    </DataWrapper>
  );
};

export default WeaponsDetailContainer;
