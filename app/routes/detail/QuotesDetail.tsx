import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import type { QuotesDetails, Characters, Films } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import StarWarsListAPI from '~/api/StarWarsListAPI';
import useAsync from '~/hooks/useAsync';
import { useCallback } from 'react';

const QuotesDetail = () => {
  const { id } = useParams();

  const fetchQuoteDetails = useCallback(() => {
    return StarWarsDetailsAPI('quotes', id || '');
  }, [id]);

  const fetchAllCharacters = useCallback(() => {
    return StarWarsListAPI('characters');
  }, []);

  const fetchAllFilms = useCallback(() => {
    return StarWarsListAPI('films');
  }, []);
  const { data: allDataCharacter } = useAsync<Characters[]>(fetchAllCharacters);
  const { data: allDataFilm } = useAsync<Films[]>(fetchAllFilms);
  const {
    data: quote,
    loading,
    error,
  } = useAsync<QuotesDetails>(fetchQuoteDetails);

  return (
    <DataWrapper loading={loading} error={error}>
      <div className="bg-quotes min-h-screen p-4">
        <h2 className="mb-4 text-center text-2xl font-bold text-amber-400">
          {quote?.text}
        </h2>
        <p>
          Character:
          <LinkResolved
            key={quote?.id}
            idKey="id"
            matchKey="id"
            collection={allDataCharacter || []}
            resource="characters"
            value={quote?.character_id}
          />
        </p>
        <p>
          Film:
          <LinkResolved
            key={quote?.id}
            idKey="id"
            matchKey="id"
            collection={allDataFilm || []}
            resource="films"
            value={quote?.film_id}
          />
        </p>
        <p>
          Context: <span className="italic">{quote?.context}</span>
        </p>
        <p>
          Is Iconic:
          <span className="p-1">
            {quote?.is_iconic ? (
              <span className="text-green-400">Yes</span>
            ) : (
              <span className="text-red-400">No</span>
            )}
          </span>
        </p>
        <p>
          Canon:{' '}
          {quote?.canon ? (
            <span className="text-green-400">Yes</span>
          ) : (
            <span className="text-red-400">No</span>
          )}
        </p>
      </div>
    </DataWrapper>
  );
};

export default QuotesDetail;
