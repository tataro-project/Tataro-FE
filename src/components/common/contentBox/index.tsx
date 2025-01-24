import { twMerge } from 'tailwind-merge';
import ContentBoxProps from './types';

const ContentBox: React.FC<ContentBoxProps> = ({ children, size, layout }) => {
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
          layout,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ContentBox;
