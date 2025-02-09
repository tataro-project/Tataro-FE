import { useRef, useState } from 'react';
import { CARD_ANGLE, RADIUS, TOTAL_CARDS } from '../constants';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

const calculateCardPosition = (index: number) => {
  const angle = index * CARD_ANGLE;
  const x = Math.cos(angle) * RADIUS;
  const y = Math.sin(angle) * RADIUS;
  return { x, y, angle };
};

const TarotCard = ({ index }: { index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y, angle } = calculateCardPosition(index);

  return (
    <div
      className="flex justify-center items-center absolute w-24 h-40 rounded-lg shadow-md transition-all duration-300 ease-in-out origin-bottom overflow-hidden"
      style={{
        left: `${RADIUS + x}px`,
        top: `${RADIUS + y}px`,
        transform: `translate(-50%,-100%) rotate(${angle + Math.PI / 2}rad) ${isHovered ? 'scale(1.2)' : 'scale(1)'}`,
        zIndex: isHovered ? 100 : index,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/tarotBack.svg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
};

const TarotAnimation = () => {
  const [rotation, setRotation] = useState(Math.PI);
  const containerRef = useRef<HTMLDivElement>(null);

  const [{ rotate }, api] = useSpring(() => ({ rotate: rotation }));

  const bind = useDrag(({ delta: [dx] }) => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const newRotation = rotation + (dx / containerWidth) * Math.PI;
      api.start({ rotate: newRotation });
      setRotation(newRotation);
    }
  });

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="relative" style={{ width: `${RADIUS * 2}px`, height: `${RADIUS}px` }}>
        <animated.div
          ref={containerRef}
          {...bind()}
          className="cursor-grab active:cursor-grabbing"
          style={{
            touchAction: 'none',
            transform: rotate.to(r => `rotate(${r}rad)`),
            transformOrigin: `${RADIUS}px ${RADIUS}px`,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '200%',
          }}
        >
          {Array.from({ length: TOTAL_CARDS }).map((_, index) => (
            <TarotCard key={index} index={index} />
          ))}
        </animated.div>
      </div>
    </div>
  );
};

export default TarotAnimation;
