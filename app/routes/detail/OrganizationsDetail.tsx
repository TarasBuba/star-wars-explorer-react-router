import useDetails from '~/hooks/useDetails';
import { useParams } from 'react-router';
import Errors from '~/components/Errors';
import Loading from '~/components/Loading';
import LinkResolved from '~/utils/link-resolved';

type Organizations = {
  name: string;
  type: string;
  founding_date: string;
  dissolution_date: string;
  refounded_date: string;
  ideology: string;
  force_alignment: string;
  headquarters_id: number;
  leader_id: number;
  notable_members: string[];
  era: string[];
  status: string;
  canon: boolean;
};

const OrganizationDetail = () => {
  const { id } = useParams();
  const allDataHeadquarters = useDetails<{ name: string; url: string }[]>({
    resource: 'planets',
  });
  const allDataLeader = useDetails<{ name: string; url: string }[]>({
    resource: 'characters',
  });
  const {
    data: organization,
    loading,
    error,
  } = useDetails<Organizations>({
    resource: 'organizations',
    id: id,
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errors message={error} />
      ) : (
        <div className="bg-organizations min-h-screen p-4">
          <h2 className="mb-4 text-center text-2xl font-bold text-amber-400">
            {organization.name}
          </h2>
          <div>
            <p>Type: {organization.type}</p>
            <p>Founding Date: {organization.founding_date}</p>
            <p>Dissolution Date: {organization.dissolution_date}</p>
            <p>Refounded Date: {organization.refounded_date}</p>
            <p>Ideology: {organization.ideology}</p>
            <p>Force Alignment: {organization.force_alignment}</p>
          </div>
          <div>
            <p>
              Headquarters: (
              <LinkResolved
                key={organization.headquarters_id}
                value={organization.headquarters_id}
                resource="planets"
                idKey="id"
                matchKey="id"
                collection={allDataHeadquarters.data || []}
              />
              )
            </p>
            <p>
              Leader:
              <span>
                <LinkResolved
                  key={organization.leader_id}
                  value={organization.leader_id}
                  resource="characters"
                  idKey="id"
                  matchKey="id"
                  collection={allDataLeader.data || []}
                />
              </span>
            </p>
            <ul>
              <p>Notable Members:</p>
              {organization.notable_members.map((member, index) => (
                <li key={index}>
                  <LinkResolved
                    value={member}
                    resource="characters"
                    idKey="id"
                    matchKey="id"
                    collection={allDataLeader.data || []}
                  />
                </li>
              ))}
            </ul>
            <p>Era: {organization.era.join(', ')}</p>
          </div>
          <p>Status: {organization.status}</p>
          <p>Canon: {organization.canon ? 'Yes' : 'No'}</p>
        </div>
      )}
    </>
  );
};
export default OrganizationDetail;
