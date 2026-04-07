import useDetails from '~/hooks/useDetails';
import { useParams } from 'react-router';
import Errors from '~/components/Errors';
import Loading from '~/components/Loading';
import LinkResolved from '~/utils/link-resolved';
import type { CharactersDetails, Characters } from '~/types/types';

export default function CharactersDetail() {
  const { id } = useParams();
  const allcharacters = useDetails<Characters[]>({
    resource: 'characters',
  });
  const {
    data: characters,
    loading,
    error,
  } = useDetails<CharactersDetails>({ resource: 'characters', id: id });

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errors message={error} />
      ) : (
        <div>
          {characters && (
            <section className="p-4">
              <article className="grid cursor-pointer grid-cols-1 gap-4 rounded-lg border border-gray-300 p-4 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <h2 className="text-4xl font-bold text-amber-500">
                  {characters.name}
                </h2>
                <div>
                  <h3 className="text-bold text-2xl lowercase">
                    Biographical Information
                  </h3>
                  <p>
                    <strong>Birth Year:</strong> {characters?.birth_year}
                  </p>
                  <p>
                    <strong>Status:</strong> {characters?.status}
                  </p>
                  <p>
                    <strong>Rank:</strong> {characters?.rank}
                  </p>
                  <p>
                    <strong>Force Side:</strong> {characters.force_side}
                  </p>
                  <p>
                    <strong>Light Saber Color:</strong>{' '}
                    {characters.lightsaber_colors.join(', ')}
                  </p>
                </div>
                <div>
                  <h3 className="text-bold text-2xl lowercase">
                    Physical Attributes
                  </h3>
                  <p>
                    <strong>Gender:</strong> {characters.gender}
                  </p>
                  <p>
                    <strong>Height:</strong> {characters.height} cm
                  </p>
                  <p>
                    <strong>Mass:</strong> {characters.mass} kg
                  </p>
                  <p>
                    <strong>Eye Color:</strong> {characters.eye_color}
                  </p>
                  <p>
                    <strong>Hair Color:</strong> {characters.hair_color}
                  </p>
                  <p>
                    <strong>Skin Color:</strong> {characters.skin_color}
                  </p>
                </div>
                <p>
                  <strong>Homeworld:</strong> {characters.homeworld_id}
                </p>
                <p>
                  <strong className="font-bold">Apprentices:</strong>{' '}
                  {characters.apprentices?.map((apprentice) => (
                    <span className="text-blue-600 hover:text-blue-950">
                      <LinkResolved
                        key={apprentice}
                        value={apprentice}
                        matchKey="name"
                        resource="characters"
                        idKey="id"
                        collection={allcharacters.data || []}
                      />
                      {' | '}
                    </span>
                  ))}
                </p>
                <p>
                  <strong>Masters:</strong>{' '}
                  {characters.masters?.map((master) => (
                    <span key={master}>
                      <LinkResolved
                        key={master}
                        value={master}
                        matchKey="name"
                        resource="characters"
                        idKey="id"
                        collection={allcharacters.data || []}
                      />
                      {' | '}
                    </span>
                  ))}
                </p>
                <p>
                  <strong>Era:</strong>{' '}
                  {characters.era?.map((era) => era).join(', ')}
                </p>
                <p>
                  <strong>Canon:</strong> {characters.canon ? 'Yes' : 'No'}
                </p>
              </article>
            </section>
          )}
        </div>
      )}
    </>
  );
}
