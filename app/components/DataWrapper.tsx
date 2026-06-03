import Loading from './Loading';
import Errors from './Errors';
import type { DataWrapperProps } from '~/types/types';

const DataWrapper = ({ children, loading, error }: DataWrapperProps) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Errors message={error} />;
  }

  return <>{children}</>;
};

export default DataWrapper;
