import Card from '~/components/Card';
import LinkResolved from '~/utils/link-resolved';
import type { CharactersDetails, Characters } from '~/types/types';

type Props = {
  characters: CharactersDetails | undefined;
  allcharacters: Characters[] | undefined;
};

const CharactersDetailView = ({ allcharacters, characters }: Props) => {
  return (
    <Card
      heading={characters?.name}
      image={characters?.image}
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

        {
          label: 'Masters',
          value: characters?.masters?.map((master) => (
            <span key={master}>
              <LinkResolved
                key={master}
                value={master}
                resource="characters"
                idKey="id"
                matchKey="id"
                collection={allcharacters || []}
              />
              {' | '}
            </span>
          )),
        },
        {
          label: 'Apprentices',
          value: characters?.apprentices?.map((apprentice) => (
            <span key={apprentice}>
              <LinkResolved
                key={apprentice}
                value={apprentice}
                resource="characters"
                idKey="id"
                matchKey="id"
                collection={allcharacters || []}
              />
              {' | '}
            </span>
          )),
        },
      ]}
    />
  );
};

export default CharactersDetailView;
