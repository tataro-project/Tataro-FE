import { ChangeEvent, useState } from 'react';
import { Editor } from '@tiptap/react';
import { FocusTrap } from 'focus-trap-react';

import useOutsideClick from '@/hooks/useOutsideClick';
import useScreenWidth from '@/hooks/useScreenWidth';

import ColorPalette from '../colorPalette';
import { createMenuItems } from './menuItems';

type ToolbarProps = {
  editor: Editor;
};

const Toolbar = ({ editor }: ToolbarProps) => {
  const [paletteType, setPaletteType] = useState<'text' | 'highlight' | null>(null);
  const showColorPalette = paletteType !== null;
  const { isInit, isCustomWidth } = useScreenWidth(640);
  const ref = useOutsideClick(() => {
    setPaletteType(null);
  });

  if (!isInit) return null;

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const imageUrl = e.target?.result as string;
        editor.chain().focus().setImage({ src: imageUrl }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextColor = (color: string | null) => {
    if (color === null) {
      editor.chain().focus().unsetColor().run();
    } else {
      editor.chain().focus().setColor(color).run();
    }
  };

  const handleHighlight = (color: string | null) => {
    if (color === null) {
      editor.chain().focus().unsetHighlight().run();
    } else {
      editor.chain().focus().setHighlight({ color }).run();
    }
  };

  const handleColorSelect = (color: string | null) => {
    if (paletteType === 'text') {
      handleTextColor(color);
    } else if (paletteType === 'highlight') {
      handleHighlight(color);
    }
    setPaletteType(null);
  };

  const menuItems = createMenuItems();

  return (
    <div
      className={`relative flex items-center border-b border-purple ${isCustomWidth ? 'flex-wrap gap-3 px-2 py-2 ' : 'gap-3 px-4 py-2'}`}
    >
      {menuItems.map(({ icon: Icon, action, isActive, title, disabled }) => (
        <button
          key={title}
          type="button"
          onClick={() => action(editor, { setPaletteType, paletteType, handleImageUpload })}
          className={`
            ${isActive(editor, paletteType) ? 'text-red-400' : 'hover:bg-gray-200 hover:scale-110'} 
            ${disabled?.(editor) ? 'opacity-50 cursor-not-allowed' : ''} 
            `}
          title={title}
          disabled={disabled?.(editor)}
          aria-label={title}
        >
          <Icon className={`${isCustomWidth ? 'w-4 h-4' : 'w-6 h-6'}`} />
        </button>
      ))}
      {showColorPalette && (
        <FocusTrap active={showColorPalette} focusTrapOptions={{ initialFocus: false }}>
          <div
            ref={ref}
            className={`absolute z-10 flex justify-center items-center w-fit h-fit bg-white p-3 border border-purple ${isCustomWidth ? 'top-8 left-24' : 'top-10 left-32'}`}
          >
            <ColorPalette onColorSelect={handleColorSelect} />
          </div>
        </FocusTrap>
      )}
    </div>
  );
};

export default Toolbar;
