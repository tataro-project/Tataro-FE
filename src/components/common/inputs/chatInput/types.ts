type ChatInputProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  className?: string;
};

export default ChatInputProps;
