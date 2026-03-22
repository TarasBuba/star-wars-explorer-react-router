import MainLayout from '~/components/layout/MainLayout';
import useDetails from '~/hooks/useDetails';
import { Link, useParams } from 'react-router';
import Errors from '~/components/Errors';
import Loading from '~/components/Loading';
import parseURL from '~/utils/parseURL';
import LinkResolved from '~/utils/link-resolved';

type Vehicles = {
  name: string;
  model: string;
  manufacturer: string;
  class: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  armor: string;
  vehicle_class: string;
  armament: string[];
  affiliation: string[];
  canon: boolean;
};

export default function VehiclesDetail() {
  const { id } = useParams();
  const allDataAffiliation = useDetails<{ name: string; url: string }[]>({
    resource: 'organizations',
  });
  // console.log(id);
  const {
    data: vehicles,
    loading,
    error,
  } = useDetails<Vehicles>({ resource: 'vehicles', id: id });

  // const getID = (url: string) => {
  //   const parts = url.split('/').filter(Boolean);
  //   return { resource: parts[parts.length - 2], id: parts[parts.length - 1] };
  // };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errors message={error} />
      ) : (
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
                  <p>
                    Max Atmosphering Speed: {vehicles.max_atmosphering_speed}
                  </p>
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
      )}
    </>
  );
}
