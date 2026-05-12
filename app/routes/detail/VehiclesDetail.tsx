import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import type { VehiclesDetails, Organizations } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';
import { useCallback } from 'react';
import useAsync from '~/hooks/useAsync';
import { getAllOrganizations } from '~/api/StarWarsAPI';
import Card from '~/components/Card';

export default function VehiclesDetail() {
  const { id } = useParams();

  const fetchVehicleDetails = useCallback(() => {
    return StarWarsDetailsAPI('vehicles', id || '');
  }, [id]);

  const { data: allDataOrganizations } =
    useAsync<Organizations[]>(getAllOrganizations);

  const {
    data: vehicles,
    loading,
    error,
  } = useAsync<VehiclesDetails>(fetchVehicleDetails);

  return (
    <DataWrapper loading={loading} error={error}>
      {/* <div>
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
                              collection={allDataOrganizations || []}
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
      </div> */}
      <Card
        heading={vehicles?.name}
        fields={[
          { label: 'Model', value: vehicles?.model },
          { label: 'Manufacturer', value: vehicles?.manufacturer },
          { label: 'Cost in Credits', value: vehicles?.cost_in_credits },
          { label: 'Length', value: vehicles?.length },
          {
            label: 'Max Atmosphering Speed',
            value: vehicles?.max_atmosphering_speed,
          },
          { label: 'Crew', value: vehicles?.crew },
          { label: 'Passengers', value: vehicles?.passengers },
          { label: 'Cargo Capacity', value: vehicles?.cargo_capacity },
          { label: 'Vehicle Class', value: vehicles?.vehicle_class },
          { label: 'Armor', value: vehicles?.armor },
          {
            label: 'Affiliation',
            value:
              vehicles?.affiliation.map((affiliation, index) => (
                <span key={index}>
                  <LinkResolved
                    value={affiliation}
                    resource="organizations"
                    matchKey="name"
                    idKey="id"
                    collection={allDataOrganizations || []}
                  />
                </span>
              )) || 'N/A',
          },
          {
            label: 'Armament',
            value:
              vehicles?.armament.map((weapon, index) => (
                <span key={index}>{weapon}, </span>
              )) || 'N/A',
          },
        ]}
      />
    </DataWrapper>
  );
}
