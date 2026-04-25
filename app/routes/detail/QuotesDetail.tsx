import { useParams } from 'react-router';
import useDetails from '~/hooks/useAsync';
import useList from '~/hooks/useList';
import LinkResolved from '~/utils/link-resolved';
import type { QuotesDetails, Characters, Films } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import StarWarsListAPI from '~/api/StarWarsListAPI';

const QuotesDetail = () => {
  const { id } = useParams();

  const allDataCharacter = useList<Characters[]>({
    resource: 'characters',
  });
  const allDataFilm = useList<Films[]>({
    resource: 'films',
  });
  const {
    data: quote,
    loading,
    error,
  } = useDetails<QuotesDetails>({
    resource: 'quotes',
    id: id,
  });

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
            collection={allDataCharacter.data || []}
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
            collection={allDataFilm.data || []}
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
