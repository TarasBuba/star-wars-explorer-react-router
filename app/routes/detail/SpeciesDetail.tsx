import { useParams } from 'react-router';
import LinkResolved from '~/utils/link-resolved';
import type { SpeciesDetails, Planets } from '~/types/types';
import DataWrapper from '~/components/DataWrapper';
import { getAllPlanets } from '~/api/StarWarsAPI';
import useAsync from '~/hooks/useAsync';
import { useCallback } from 'react';
import StarWarsDetailsAPI from '~/api/StarWarsDetailsAPI';
import Card from '~/components/Card';

export default function SpeciesDetail() {
  const { id } = useParams();

  const fetchSpeciesDetails = useCallback(() => {
    return StarWarsDetailsAPI('species', id || '');
  }, [id]);

  const { data: allDataHomeworld } = useAsync<Planets[]>(getAllPlanets);

  const {
    data: species,
    loading,
    error,
  } = useAsync<SpeciesDetails>(fetchSpeciesDetails);

  return (
    <DataWrapper loading={loading} error={error}>
      <Card
        heading={species?.name}
        image={species?.image}
        fields={[
          { label: 'Classification', value: species?.classification },
          { label: 'Average Lifespan', value: species?.average_lifespan },
          { label: 'Designation', value: species?.designation },
          { label: 'Average Height', value: species?.average_height },
          {
            label: 'Skin Colors',
            value: species?.skin_colors.map((color) => (
              <span key={color}>{color}, </span>
            )),
          },
          {
            label: 'Hair Colors',
            value: species?.hair_colors.map((color) => (
              <span key={color}>{color}, </span>
            )),
          },
          {
            label: 'Eye Colors',
            value: species?.eye_colors.map((color) => (
              <span key={color}>{color}, </span>
            )),
          },
          { label: 'Language', value: species?.language },
          {
            label: 'Homeworld',
            value: (
              <span>
                <LinkResolved
                  key={species?.homeworld_id}
                  value={species?.homeworld_id}
                  resource="planets"
                  matchKey="id"
                  idKey="id"
                  collection={allDataHomeworld || []}
                />
              </span>
            ),
          },
        ]}
      />
    </DataWrapper>
  );
}
