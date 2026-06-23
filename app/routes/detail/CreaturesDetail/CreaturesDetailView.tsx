import Card from '~/components/Card';
import type { Creatures } from '~/types/types';

type Props = {
  creature: Creatures | undefined;
};

const CreaturesDetailView = ({ creature }: Props) => {
  return (
    <Card
      heading={creature?.name}
      image={creature?.image}
      fields={[
        { label: 'Name', value: creature?.name },
        { label: 'Description', value: creature?.description },
      ]}
    />
  );
};

export default CreaturesDetailView;
