import { useEffect } from 'react';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import Toolbar from './toolbar';

type TextEditorProps = {
  value?: string;
  onChange?: (html: string) => void;
};

const TextEditor = ({ value, onChange }: TextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Underline,
      Image,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col w-full h-full border border-purple bg-cream font-gMedium text-purple">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        onClick={() => editor?.chain().focus().run()}
        className="flex-1 px-4 py-2 overflow-y-scroll scrollbar-hide"
      />
    </div>
  );
};

export default TextEditor;
