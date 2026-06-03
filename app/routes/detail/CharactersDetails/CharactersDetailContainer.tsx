import useCharacterDetail from './useCharacterDetail';
import DataWrapper from '~/components/DataWrapper';
import CharactersDetail from './CharactersDetail';

const CharactersDetailContainer = () => {
  const { loading, error, character, allcharacters } = useCharacterDetail();

  return (
    <DataWrapper loading={loading} error={error}>
      <CharactersDetail character={character} allcharacters={allcharacters} />
    </DataWrapper>
  );
};

export default CharactersDetailContainer;
