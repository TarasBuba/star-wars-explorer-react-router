import Card from '~/components/Card';
import LinkResolved from '~/utils/link-resolved';
import type { SpeciesDetails, Planets } from '~/types/types';

type Props = {
  species: SpeciesDetails | null;
  allDataHomeworld: Planets[] | null;
};

const SpeciesDetailView = ({ species, allDataHomeworld }: Props) => {
  return (
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
  );
};

export default SpeciesDetailView;
