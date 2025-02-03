type ContentBoxProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  variant?: 'default' | 'price' | 'layerCard';
  size?: string;
  layout?: string;
};

export default ContentBoxProps;
