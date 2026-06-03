import useAsync from '~/hooks/useAsync';
import { useParams } from 'react-router';
import type { CharactersDetails, Characters } from '~/types/types';

import { useCallback } from 'react';
import { getAllCharacters, getResourceById } from '~/api/StarWarsAPI';

export default function useCharacterDetail() {
  const { id } = useParams();
  const fetchCharacter = useCallback(
    () => getResourceById('characters', id),
    [id]
  );
  const { loading, error, data } = useAsync<CharactersDetails>(
    fetchCharacter,
    id
  );
  const fetchAllCharacters = useCallback(() => getAllCharacters(), []);
  const { data: allcharacters } = useAsync<Characters[]>(fetchAllCharacters);

  return {
    loading,
    error,
    character: data,
    allcharacters,
  };
}
