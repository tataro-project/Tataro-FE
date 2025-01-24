import { twMerge } from 'tailwind-merge';
import FrameProps from './types';

const Frame: React.FC<FrameProps> = ({ children, size, className }) => {
  return (
    <div
      className={twMerge(
        'relative top-1 left-1 w-full h-full bg-deepPink border z-10 border-purple',
        size,
      )}
    >
      <div
        className={twMerge(
          'flex flex-col justify-center items-center gap-10 absolute bottom-2 right-2 -z-10 w-full h-full bg-softPink border border-purple',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Frame;
