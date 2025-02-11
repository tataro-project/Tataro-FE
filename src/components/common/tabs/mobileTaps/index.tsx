'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

import { TabProps } from '../types';

const MobileTabs: React.FC<{ children: React.ReactElement<TabProps>[] }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="relative top-1 left-1 z-10 w-full h-full border bg-deepPink border-purple text-sm">
        <div className="flex flex-col justify-center items-center absolute bottom-2 right-2 -z-10 w-full h-full border bg-softPink border-purple">
          {children[activeTab]}
        </div>
      </div>
      <div className="flex z-20 relative left-1 w-full">
        {/* <div className="flex-grow border-t border-purple"></div> */}
        {children.map((child, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveTab(index);
              (child.props.onClick as () => void)?.();
            }}
            className={clsx(
              'flex justify-center flex-grow py-4 border border-t-0 border-purple font-lilita text-sm text-cream stroke',
              activeTab === index
                ? 'relative -left-[7px] bottom-2 z-30 bg-softPink'
                : 'bg-deepPink',
              activeTab === children.length - 1 ? '-left-[9px]' : '',
              activeTab === 0 && 'last:border-l-0',
              activeTab === children.length - 1 && 'first:border-r-0',
            )}
          >
            {child.props.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const MobileTab: React.FC<TabProps> = ({ children }) => {
  return <div className="w-full h-full p-6">{children}</div>;
};

export { MobileTab, MobileTabs };
