import useDetails from '~/hooks/useAsync';
import useList from '~/hooks/useList';
import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import type { VehiclesDetails, Organizations } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';

export default function VehiclesDetail() {
  const { id } = useParams();
  const allDataAffiliation = useList<Organizations[]>({
    resource: 'organizations',
  });

  const {
    data: vehicles,
    loading,
    error,
  } = useDetails<VehiclesDetails>({ resource: 'vehicles', id: id });

  return (
    <DataWrapper loading={loading} error={error}>
      <div>
        <section className="grid place-items-center p-4">
          <h2 className="mb-4 text-2xl font-bold">{vehicles?.name}</h2>
          <div className="grid grid-cols-1 gap-4">
            {vehicles && (
              <article className="flex w-full cursor-pointer flex-col gap-2 rounded-lg border border-gray-300 p-4 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <h2 className="mb-4 text-xl font-bold">
                  Model: {vehicles.model}
                </h2>
                <p>Manufacturer: {vehicles.manufacturer}</p>
                <p>Cost in Credits: {vehicles.cost_in_credits}</p>
                <p>Length: {vehicles.length}</p>
                <p>Max Atmosphering Speed: {vehicles.max_atmosphering_speed}</p>
                <p>Crew: {vehicles.crew}</p>
                <p>Passengers: {vehicles.passengers}</p>
                <p>Cargo Capacity: {vehicles.cargo_capacity}</p>
                <p>Vehicle Class: {vehicles.vehicle_class}</p>
                <p>Armor: {vehicles.armor}</p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {vehicles.affiliation && (
                    <div>
                      <h3 className="mb-2 text-xl font-bold">Affiliation:</h3>
                      <ul>
                        {vehicles.affiliation.map((affiliation, index) => (
                          <li key={index}>
                            <LinkResolved
                              value={affiliation}
                              resource="organizations"
                              matchKey="name"
                              idKey="id"
                              collection={allDataAffiliation.data || []}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {vehicles.armament && (
                    <div>
                      <h3 className="mb-2 text-xl font-bold">Armament:</h3>
                      <ul>
                        {vehicles.armament.map((weapon, index) => (
                          <li key={index}>{weapon}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            )}
          </div>
        </section>
      </div>
    </DataWrapper>
  );
}
