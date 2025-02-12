import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, PanInfo, useSpring, useTransform } from 'framer-motion';

import CardBack from '@images/CardBack.svg';

import { CARD_ANGLE, RADIUS, TOTAL_CARDS } from '../constants';

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
    <motion.div
      className="flex justify-center items-center absolute w-24 h-40 rounded-lg shadow-md transition-all duration-300 ease-in-out origin-bottom overflow-hidden"
      style={{
        left: `${RADIUS + x}px`,
        top: `${RADIUS + y}px`,
        transform: `translate(-50%,-100%) rotate(${angle + Math.PI / 2}rad) scale(${isHovered ? 1.15 : 1})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image src={CardBack} alt="Tarot Card Back" fill draggable="false" />
    </motion.div>
  );
};

const TarotAnimation = () => {
  const [rotation, setRotation] = useState(Math.PI);
  const containerRef = useRef<HTMLDivElement>(null);

  const rotateMotion = useSpring(rotation, {
    stiffness: 300,
    damping: 30,
    mass: 1,
  });

  const rotateTransform = useTransform(rotateMotion, r => `rotate(${r}rad)`);

  const handleDrag = (_: never, info: PanInfo) => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const newRotation = rotation + (info.delta.x / containerWidth) * Math.PI;
      rotateMotion.set(newRotation);
      setRotation(newRotation);
    }
  };

  return (
    <div className="flex items-center justify-center fixed inset-0 z-50">
      <div className="relative" style={{ width: `${RADIUS * 2}px`, height: `${RADIUS}px` }}>
        <motion.div
          ref={containerRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDrag={handleDrag}
          style={{
            touchAction: 'none',
            transform: rotateTransform,
            transformOrigin: `${RADIUS}px ${RADIUS}px`,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '200%',
          }}
          className="cursor-grab active:cursor-grabbing"
        >
          {Array.from({ length: TOTAL_CARDS }).map((_, index) => (
            <TarotCard key={index} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TarotAnimation;
