import useCharacterDetail from './useCharacterDetail';
import DataWrapper from '~/components/DataWrapper';
import CharactersDetailView from './CharactersDetailView';

const CharactersDetailContainer = () => {
  const { loading, error, characters, allcharacters } = useCharacterDetail();

  return (
    <DataWrapper loading={loading} error={error}>
      <CharactersDetailView
        characters={characters ?? undefined}
        allcharacters={allcharacters ?? undefined}
      />
    </DataWrapper>
  );
};

export default CharactersDetailContainer;
