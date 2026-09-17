import Card from '~/components/Card';
import type { Droids } from '~/types/types';

type Props = {
  droids: Droids | undefined;
};

const DroidsDetails = ({ droids }: Props) => {
  return (
    <Card
      variant="detail"
      heading={droids?.name}
      image={droids?.image}
      fields={[
        { label: 'Model', value: droids?.name },
        {
          label: 'Description',
          value: droids?.description,
        },
      ]}
    />
  );
};

export default DroidsDetails;
