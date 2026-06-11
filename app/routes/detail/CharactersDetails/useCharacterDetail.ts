import useAsync from '~/hooks/useAsync';
import { useParams } from 'react-router';
import type { CharactersDetails, Characters } from '~/types/types';
import { getAllCharacters, getResourceById } from '~/api/StarWarsAPI';

export default function useCharacterDetail() {
  const { id } = useParams();
  const fetchCharacter = () => getResourceById('characters', id);

  const { loading, error, data } = useAsync<CharactersDetails>(
    fetchCharacter,
    id
  );
  const fetchAllCharacters = () => getAllCharacters();
  const { data: allcharacters } = useAsync<Characters[]>(fetchAllCharacters);

  return {
    loading,
    error,
    character: data,
    allcharacters,
  };
}
