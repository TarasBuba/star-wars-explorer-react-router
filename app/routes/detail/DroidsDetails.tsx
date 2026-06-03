import useAsync from '~/hooks/useAsync';
import { useParams } from 'react-router';
import DataWrapper from '~/components/DataWrapper';
import { useCallback } from 'react';
import Card from '~/components/Card';
import type { Droids } from '~/types/types';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';

const DroidsDetails = () => {
  const { id } = useParams();

  const fetchDroid = useCallback(() => {
    return StarWarsDetailsAPI('droids', id || '');
  }, [id]);

  const { data: droid, loading, error } = useAsync<Droids>(fetchDroid);

  return (
    <DataWrapper loading={loading} error={error}>
      <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-2">
        <Card
          heading={droid?.name}
          image={droid?.image}
          fields={[
            { label: 'Model', value: droid?.name },
            {
              label: 'Description',
              value: droid?.description,
            },
          ]}
        />
      </section>
    </DataWrapper>
  );
};

export default DroidsDetails;
