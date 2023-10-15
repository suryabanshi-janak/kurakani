import * as React from 'react';
import { Loader2, MessageSquare } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import { useIntersection } from '@mantine/hooks';
import { trpc } from '@/app/_trpc/client';

import Message from './Message';
import { ChatContext } from './ChatContext';
import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query';

interface MessagesProps {
  fileId: string;
}

export default function Messages({ fileId }: MessagesProps) {
  const { isLoading: isAIThinking } = React.useContext(ChatContext);

  const { data, isFetching, fetchNextPage } =
    trpc.getFileMessages.useInfiniteQuery(
      {
        fileId,
        limit: INFINITE_QUERY_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        keepPreviousData: true,
      }
    );

  const messages = data?.pages.flatMap((page) => page?.messages);

  const loadingMessage = {
    createdAt: new Date().toISOString(),
    isUserMessage: false,
    id: 'loading-message',
    text: (
      <span className='flex items-center justify-center h-full'>
        <Loader2 className='h-4 w-4 animate-spin' />
      </span>
    ),
  };

  const combinedMessages = [
    ...(isAIThinking ? [loadingMessage] : []),
    ...(messages ?? []),
  ];

  const lastMessageRef = React.useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: lastMessageRef.current,
    threshold: 1,
  });

  React.useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  return (
    <div className='flex max-h-[calc(100vh-3.5rem-7rem)] border-zinc-200 flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
      {combinedMessages && combinedMessages.length > 0 ? (
        combinedMessages.map((message, i) => {
          const isNextMessageSamePerson =
            combinedMessages[i]?.isUserMessage ===
            combinedMessages[i - 1]?.isUserMessage;

          if (i === combinedMessages.length - 1) {
            return (
              <Message
                ref={ref}
                key={message.id}
                message={message}
                isNextMessageSamePerson={isNextMessageSamePerson}
              />
            );
          } else {
            return (
              <Message
                key={message.id}
                message={message}
                isNextMessageSamePerson={isNextMessageSamePerson}
              />
            );
          }
        })
      ) : isFetching ? (
        <div className='w-full flex flex-col gap-2'>
          <Skeleton className='h-14' />
          <Skeleton className='h-14' />
          <Skeleton className='h-14' />
          <Skeleton className='h-14' />
        </div>
      ) : (
        <div className='flex flex-1 flex-col justify-center items-center gap-2'>
          <MessageSquare className='h-8 w-8 text-green-500' />
          <h3 className='text-xl font-semibold'>You&apos;re all set!</h3>
          <p className='text-sm text-zinc-500'>
            Ask your first question to get started
          </p>
        </div>
      )}
    </div>
  );
}
