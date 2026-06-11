import useCharacterDetail from './useCharacterDetail';
import DataWrapper from '~/components/DataWrapper';
import CharactersDetailView from './CharactersDetailView';

const CharactersDetailContainer = () => {
  const { loading, error, character, allcharacters } = useCharacterDetail();

  return (
    <DataWrapper loading={loading} error={error}>
      <CharactersDetailView
        character={character}
        allcharacters={allcharacters}
      />
    </DataWrapper>
  );
};

export default CharactersDetailContainer;
