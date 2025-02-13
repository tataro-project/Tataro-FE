import React from 'react';
import { Square, SquareSlash } from 'lucide-react';

import useScreenWidth from '@/hooks/useScreenWidth';

type ColorPaletteProps = {
  onColorSelect: (color: string | null) => void;
};

const ColorPalette = ({ onColorSelect }: ColorPaletteProps) => {
  const { isCustomWidth } = useScreenWidth(640);
  const colors = ['#CF3F2F', '#FF9B36', '#FBC114', '#98DA5B', '#95C9E7', '#0E72D5', '#151515'];

  return (
    <div
      className={`grid grid-cols-4 items-center ${isCustomWidth ? 'gap-1' : 'gap-2'}`}
      aria-label="색상 선택"
    >
      <button aria-label="색상없음" onClick={() => onColorSelect(null)}>
        <SquareSlash className={`${isCustomWidth ? 'w-5 h-5' : 'w-6 h-6'}`} />
      </button>
      {colors.map(color => (
        <button key={color} onClick={() => onColorSelect(color)} aria-label={`${color}`}>
          <Square className={`${isCustomWidth ? 'w-5 h-5' : 'w-6 h-6'}`} style={{ fill: color }} />
        </button>
      ))}
    </div>
  );
};

export default ColorPalette;
