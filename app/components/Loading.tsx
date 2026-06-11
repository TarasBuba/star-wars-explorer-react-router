import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonCard from './SkeletonCard';
const Loading: React.FC = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </>
  );
};

export default Loading;
