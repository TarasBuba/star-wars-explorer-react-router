import DataWrapper from '~/components/DataWrapper';
import OrganizationDetailView from './OrganizationsDetailView';
import useOrganizationsDetail from './useOrganizationsDetail';

const OrganizationDetailContainer = () => {
  const {
    loading,
    error,
    data: organization,
    allDataHeadquarters,
    allDataLeader,
  } = useOrganizationsDetail();

  return (
    <DataWrapper loading={loading} error={error}>
      <OrganizationDetailView
        organization={organization ?? undefined}
        allDataHeadquarters={allDataHeadquarters ?? undefined}
        allDataLeader={allDataLeader ?? undefined}
      />
    </DataWrapper>
  );
};
export default OrganizationDetailContainer;
