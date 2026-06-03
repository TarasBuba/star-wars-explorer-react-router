import useAsync from '~/hooks/useAsync';
import { useParams } from 'react-router';
import DataWrapper from '~/components/DataWrapper';
import { useCallback } from 'react';
import Card from '~/components/Card';
import type { Creatures } from '~/types/types';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';

const CreaturesDetail = () => {
  const { id } = useParams();

  const fetchCreature = useCallback(() => {
    return StarWarsDetailsAPI('creatures', id || '');
  }, [id]);

  const { data: creature, loading, error } = useAsync<Creatures>(fetchCreature);

  return (
    <DataWrapper loading={loading} error={error}>
      <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 md:grid-cols-2">
        <Card
          heading={creature?.name}
          image={creature?.image}
          fields={[
            { label: 'Name', value: creature?.name },
            { label: 'Description', value: creature?.description },
          ]}
        />
      </section>
    </DataWrapper>
  );
};

export default CreaturesDetail;
