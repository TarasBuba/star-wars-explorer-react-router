import useAsync from '~/hooks/useAsync';
import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import type { CharactersDetails, Characters } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';
import { useCallback } from 'react';
import { getAllCharacters, getResourceById } from '~/api/StarWarsAPI';
import Card from '~/components/Card';

const CharactersDetail = () => {
  const { id } = useParams();

  const fetchCharacter = useCallback(() => {
    return getResourceById('characters', id || '');
  }, [id]);

  const { data: allcharacters } = useAsync<Characters[]>(getAllCharacters);
  const {
    data: characters,
    loading,
    error,
  } = useAsync<CharactersDetails>(fetchCharacter);

  return (
    <DataWrapper loading={loading} error={error}>
      <Card
        heading={characters?.name}
        fields={[
          { label: 'Birth Year', value: characters?.birth_year },
          { label: 'Status', value: characters?.status },
          { label: 'Rank', value: characters?.rank },
          { label: 'Force Side', value: characters?.force_side },
          {
            label: 'Light Saber Color',
            value: characters?.lightsaber_colors.join(', '),
          },
          { label: 'Gender', value: characters?.gender },
          { label: 'Height', value: characters?.height },
          { label: 'Mass', value: characters?.mass },
          { label: 'Eye Color', value: characters?.eye_color },
          { label: 'Hair Color', value: characters?.hair_color },
          { label: 'Skin Color', value: characters?.skin_color },
          { label: 'Homeworld', value: characters?.homeworld_id },
          { label: 'Era', value: characters?.era?.join(', ') },
          { label: 'Canon', value: characters?.canon ? 'Yes' : 'No' },
        ]}
      />
      <ul>
        {characters?.apprentices?.map((apprentice) => (
          <li key={apprentice}>
            <LinkResolved
              value={apprentice}
              matchKey="name"
              resource="characters"
              idKey="id"
              collection={allcharacters || []}
            />
          </li>
        ))}
      </ul>
      <ul>
        {characters?.masters?.map((master) => (
          <li key={master}>
            <LinkResolved
              value={master}
              matchKey="name"
              resource="characters"
              idKey="id"
              collection={allcharacters || []}
            />
          </li>
        ))}
      </ul>
    </DataWrapper>
  );
};

export default CharactersDetail;
