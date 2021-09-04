import ReactLoadingSkeleton, { SkeletonProps } from 'react-loading-skeleton';
import { useChat } from '@src/hooks';

const Skeleton: React.FC<SkeletonProps> = ({ children, ...props }) => {
  const { loading } = useChat();

  return loading ? <ReactLoadingSkeleton {...props} /> : <>{children}</>;
};

export default Skeleton;
