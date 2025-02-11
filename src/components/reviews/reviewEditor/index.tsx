import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { EditorContent, useEditor } from '@tiptap/react';
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
  Paintbrush,
  Redo,
  Strikethrough,
  UnderlineIcon,
  Undo,
} from 'lucide-react';
const ReviewEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Highlight.configure({ multicolor: true }),
      TextStyle.configure({ mergeNestedSpanStyles: true }),
      Underline,
      Image,
    ],
    content: '<p>후기후기~<p/>',
    autofocus: true,
    editable: true,
  });

  if (!editor) {
    return null;
  }

  const menuItems = [
    {
      icon: Heading1Icon,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
      title: 'Heading 1',
    },
    {
      icon: Heading2Icon,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
      title: 'Heading 2',
    },
    {
      icon: Heading3Icon,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
      title: 'Heading 3',
    },
    {
      icon: Paintbrush,
      action: () => {},
      isActive: () => false,
      title: 'Text Color',
    },
    {
      icon: HighlighterIcon,
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive('highlight'),
      title: 'Highlight',
    },
    {
      icon: BoldIcon,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
      title: 'Bold',
    },
    {
      icon: ItalicIcon,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
      title: 'Italic',
    },
    {
      icon: UnderlineIcon,
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: () => editor.isActive('underline'),
      title: 'Underline',
    },
    {
      icon: Strikethrough,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
      title: 'Strikethrough',
    },
    {
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
      title: 'Bullet List',
    },
    {
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
      title: 'Ordered List',
    },
    {
      icon: Images,
      action: () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = e => handleImageUpload(e as any);
        input.click();
      },
      isActive: () => false,
      title: 'Insert Image',
    },
    {
      icon: Undo,
      action: () => editor.chain().undo().run(),
      isActive: () => false,
      title: 'Undo',
    },
    {
      icon: Redo,
      action: () => editor.chain().redo().run(),
      isActive: () => false,
      title: 'Redo',
    },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const imageUrl = e.target?.result as string;
        editor?.chain().focus().setImage({ src: imageUrl }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-full border border-purple bg-cream font-gMedium text-purple">
      <div className="flex itmes-center gap-3 border-b border-purple px-4 py-2">
        {menuItems.map(item => (
          <button
            key={item.title}
            onClick={item.action}
            className={item.isActive() ? 'is-active' : ''}
            title={item.title}
          >
            <item.icon />
          </button>
        ))}
      </div>
      <EditorContent editor={editor} className="px-4 py-2" />
    </div>
  );
};

export default ReviewEditor;
