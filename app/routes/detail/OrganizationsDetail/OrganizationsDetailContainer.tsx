import DataWrapper from '~/components/DataWrapper';
import OrganizationDetailView from './OrganizationsDetailView';
import useOrganizationaDetail from './useOrganizationsDetail';

const OrganizationDetailContainer = () => {
  const { loading, error, organization, allDataHeadquarters, allDataLeader } =
    useOrganizationsDetail();

  return (
    <DataWrapper loading={loading} error={error}>
      <OrganizationDetailView
        organization={organization}
        allDataHeadquarters={allDataHeadquarters}
        allDataLeader={allDataLeader}
      />
    </DataWrapper>
  );
};
export default OrganizationDetailContainer;
