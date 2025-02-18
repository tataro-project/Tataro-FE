import { useEffect, useRef, useState } from 'react';

import { paginatedTarotChatHistory } from '@/api/tarotApi';
import Pagination from '@/components/common/pagination';
import useScreenWidth from '@/hooks/useScreenWidth';

import ChatlogCard from './chatlogCard';
import { TarotChatlogs } from './type';

const ChatHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tarotChatlogs, setTarotChatlogs] = useState<TarotChatlogs[]>([]);
  const [totalTarotChatlogs, setTotalTarotChatlogs] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isCustomWidth } = useScreenWidth(640);
  const perPage = 3;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    containerRef.current?.focus();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await paginatedTarotChatHistory(currentPage, perPage);
        console.log(data);
        setTarotChatlogs(data.chat_contents);
        setTotalTarotChatlogs(data.total_count);
      } catch (error) {
        console.error('Failed to fetch tarotChatlogs', error);
      }
    };
    fetchData();
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
          flex flex-col justify-start items-center w-full
          ${isCustomWidth ? 'min-h-[350px] gap-3' : 'min-h-[410px] gap-6'}
        `}
      >
        {tarotChatlogs.map(chatlog => (
          <ChatlogCard
            key={chatlog.room_id}
            room_id={chatlog.room_id}
            chat_log={chatlog.chat_log}
            created_at={chatlog.created_at}
            is_review={chatlog.is_review}
          />
        ))}
      </ul>
      <Pagination
        totalResults={totalTarotChatlogs}
        currentPage={currentPage}
        setPage={handlePageChange}
        perPage={perPage}
      />
    </div>
  );
};

export default ChatHistory;
