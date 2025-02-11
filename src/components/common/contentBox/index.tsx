import React from 'react';
import { twMerge } from 'tailwind-merge';

import { contentBoxBaseStyles, contentBoxShadowStyles } from './contentBoxStyles';

import ContentBoxProps from './types';

const ContentBox = React.forwardRef<HTMLDivElement, ContentBoxProps>(
  ({ children, variant = 'default', size, layout }, ref) => {
    return (
      <div ref={ref} className={twMerge(contentBoxShadowStyles({ variant }), size)}>
        <div className={twMerge(contentBoxBaseStyles({ variant }), layout)}>{children}</div>
      </div>
    );
  },
);

ContentBox.displayName = 'ContentBox';

export default ContentBox;
