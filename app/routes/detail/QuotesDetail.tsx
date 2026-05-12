import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import type { QuotesDetails, Characters, Films } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import useAsync from '~/hooks/useAsync';
import { useCallback } from 'react';
import { getAllCharacters, getAllFilms } from '~/api/StarWarsAPI';
import Card from '~/components/Card';

const QuotesDetail = () => {
  const { id } = useParams();

  const fetchQuoteDetails = useCallback(() => {
    return StarWarsDetailsAPI('quotes', id || '');
  }, [id]);

  const { data: allDataCharacter } = useAsync<Characters[]>(getAllCharacters);
  const { data: allDataFilm } = useAsync<Films[]>(getAllFilms);
  const {
    data: quote,
    loading,
    error,
  } = useAsync<QuotesDetails>(fetchQuoteDetails);

  return (
    <DataWrapper loading={loading} error={error}>
      <Card
        heading={quote?.text}
        fields={[
          {
            label: 'Character',
            value: (
              <LinkResolved
                key={quote?.character_id}
                value={quote?.character_id}
                resource="characters"
                idKey="id"
                matchKey="id"
                collection={allDataCharacter || []}
              />
            ),
          },
          {
            label: 'Film',
            value: (
              <LinkResolved
                key={quote?.film_id}
                value={quote?.film_id}
                resource="films"
                idKey="id"
                matchKey="id"
                collection={allDataFilm || []}
              />
            ),
          },
          { label: 'Context', value: quote?.context },
          { label: 'Canon', value: quote?.canon ? 'Yes' : 'No' },
        ]}
      />
    </DataWrapper>
  );
};

export default QuotesDetail;
