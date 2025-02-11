'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

import { TabProps } from '../types';

const PriceTabs: React.FC<{ children: React.ReactElement<TabProps>[] }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col w-full h-full font-gMedium text-sm md:text-base scrollable overflow-y-auto">
      <div className="flex">
        {children.map((child, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={clsx(
              'w-24 md:w-28 py-1.5 border border-purple rounded-tr-3xl',
              activeTab === index
                ? 'border-b-lightPink bg-lightPink text-purple'
                : 'bg-deepPink hover:bg-opacity-75 text-cream',
            )}
          >
            {child.props.label}
          </button>
        ))}
        <div className="flex-grow border-b border-purple"></div>
      </div>
      <div className="grow w-full px-4 py-2 border border-t-0 border-purple bg-lightPink text-purple overflow-y-auto">
        {children[activeTab]}
      </div>
    </div>
  );
};

const PriceTab: React.FC<TabProps> = ({ children }) => {
  return <div className="">{children}</div>;
};

export { PriceTab, PriceTabs };
