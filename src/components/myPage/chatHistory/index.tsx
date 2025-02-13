import { useEffect, useMemo, useRef, useState } from 'react';

import Pagination from '@/components/common/pagination';
import useScreenWidth from '@/hooks/useScreenWidth';

import ChatlogCard from './chatlogCard';
import { mockChatlogs } from './mockData';
import { Chatlog } from './type';

const ChatHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isCustomWidth } = useScreenWidth(640);
  const chatlogs: Chatlog[] = mockChatlogs;
  const perPage = 3;

  const sortedChatlogs = useMemo(() => {
    return [...chatlogs].sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [chatlogs]);

  const currentChatlogs = useMemo(() => {
    return sortedChatlogs.slice((currentPage - 1) * perPage, currentPage * perPage);
  }, [sortedChatlogs, currentPage, perPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    containerRef.current?.focus();
  };

  useEffect(() => {
    //API 호출
  }, [currentPage]);
  return (
    <div
      ref={containerRef}
      className={`flex flex-col justify-around items-center w-full h-full focus:outline-none ${isCustomWidth ? '' : 'px-14'}`}
      tabIndex={-1}
    >
      <h1 className={`font-lilita text-cream stroke ${isCustomWidth ? 'text-3xl' : 'text-4xl'}`}>
        Chat History
      </h1>
      <ul
        className={`
          flex flex-col justify-start items-center
          ${isCustomWidth ? 'min-h-[350px] gap-3' : 'min-h-[410px] gap-6'}
        `}
      >
        {currentChatlogs.map(chatlog => (
          <ChatlogCard
            key={chatlog.id}
            id={chatlog.id}
            content={chatlog.content}
            created_at={chatlog.created_at}
            isReviewed={chatlog.isReviewed}
          />
        ))}
      </ul>
      <Pagination
        totalResults={chatlogs.length}
        currentPage={currentPage}
        setPage={handlePageChange}
        perPage={perPage}
      />
    </div>
  );
};

export default ChatHistory;
