import { Editor } from '@tiptap/react';
import {
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  HighlighterIcon,
  Images,
  ItalicIcon,
  List,
  ListOrdered,
  LucideIcon,
  Paintbrush,
  Redo,
  Strikethrough,
  UnderlineIcon,
  Undo,
} from 'lucide-react';

type MenuItem = {
  icon: LucideIcon;
  title: string;
  action: (
    editor: Editor,
    options?: {
      setPaletteType?: (type: 'text' | 'highlight' | null) => void;
      paletteType?: 'text' | 'highlight' | null;
      handleImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    },
  ) => void;
  isActive: (editor: Editor, paletteType?: 'text' | 'highlight' | null) => boolean;
  disabled?: (editor: Editor) => boolean;
};

export const createMenuItems = (): MenuItem[] => [
  {
    icon: Heading1Icon,
    action: editor => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: editor => editor.isActive('heading', { level: 1 }),
    title: '제목1',
  },
  {
    icon: Heading2Icon,
    action: editor => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: editor => editor.isActive('heading', { level: 2 }),
    title: '제목2',
  },
  {
    icon: Heading3Icon,
    action: editor => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: editor => editor.isActive('heading', { level: 3 }),
    title: '제목3',
  },
  {
    icon: Paintbrush,
    action: (editor, options) => {
      options?.setPaletteType?.(options.paletteType === 'text' ? null : 'text');
    },
    isActive: (editor, paletteType) => paletteType === 'text',
    title: '글자색',
  },
  {
    icon: HighlighterIcon,
    action: (editor, options) => {
      options?.setPaletteType?.(options.paletteType === 'highlight' ? null : 'highlight');
    },
    isActive: (editor, paletteType) => paletteType === 'highlight',
    title: '글자 배경색',
  },
  {
    icon: BoldIcon,
    action: editor => editor.chain().focus().toggleBold().run(),
    isActive: editor => editor.isActive('bold'),
    title: '굵기',
  },
  {
    icon: ItalicIcon,
    action: editor => editor.chain().focus().toggleItalic().run(),
    isActive: editor => editor.isActive('italic'),
    title: '기울기',
  },
  {
    icon: UnderlineIcon,
    action: editor => editor.chain().focus().toggleUnderline().run(),
    isActive: editor => editor.isActive('underline'),
    title: '밑줄',
  },
  {
    icon: Strikethrough,
    action: editor => editor.chain().focus().toggleStrike().run(),
    isActive: editor => editor.isActive('strike'),
    title: '취소선',
  },
  {
    icon: List,
    action: editor => editor.chain().focus().toggleBulletList().run(),
    isActive: editor => editor.isActive('bulletList'),
    title: '기호 목록',
  },
  {
    icon: ListOrdered,
    action: editor => editor.chain().focus().toggleOrderedList().run(),
    isActive: editor => editor.isActive('orderedList'),
    title: '숫자 목록',
  },
  {
    icon: Images,
    action: (editor, options) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
          options?.handleImageUpload?.({ target: e.target } as React.ChangeEvent<HTMLInputElement>);
        }
      };
      input.click();
    },
    isActive: () => false,
    title: '이미지 삽입',
  },
  {
    icon: Undo,
    action: editor => editor.chain().focus().undo().run(),
    isActive: () => false,
    title: '실행 취소',
    disabled: editor => !editor.can().undo(),
  },
  {
    icon: Redo,
    action: editor => editor.chain().focus().redo().run(),
    isActive: () => false,
    title: '다시 실행',
    disabled: editor => !editor.can().redo(),
  },
];
