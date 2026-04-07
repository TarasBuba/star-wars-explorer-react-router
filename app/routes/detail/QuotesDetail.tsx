import { useParams } from 'react-router';
import Loading from '~/components/Loading';
import Errors from '~/components/Errors';
import useDetails from '~/hooks/useDetails';
import LinkResolved from '~/utils/link-resolved';
import type { QuotesDetails, Characters, Films } from '~/types/types';

const QuotesDetail = () => {
  const { id } = useParams();
  const allDataCharacter = useDetails<Characters[]>({
    resource: 'characters',
  });
  const allDataFilm = useDetails<Films[]>({
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
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Errors message={error} />
      ) : (
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
          <p>Context: {quote?.context}</p>
          <p>Is Iconic: {quote?.is_icononic ? 'Yes' : 'No'}</p>
          <p>Canon: {quote?.canon ? 'Yes' : 'No'}</p>
        </div>
      )}
    </>
  );
};

export default QuotesDetail;
