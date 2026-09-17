import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCard = () => {
  return (
    <>
      <div className="mb-4 flex items-center justify-between rounded-lg border p-4 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg md:flex-row">
        <div className="mb-2 text-2xl font-bold">
          <Skeleton height={32} width={150} />
          <Skeleton height={16} count={2} />
        </div>
        <div className="ml-4 aspect-video overflow-hidden rounded-lg">
          <Skeleton height={280} width={396} />
        </div>
      </div>
    </>
  );
};

export default SkeletonCard;
