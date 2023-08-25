'use client';

import useConversation from '@/app/hooks/useConversation';
import { FullMessageType } from '@/app/types';
import { Conversation, User } from '@prisma/client';
import React, { useEffect, useRef, useState } from 'react';
import MessageBox from './MessageBox';
import axios from 'axios';

interface BodyProps {
  initialMessages: FullMessageType[];
  conversationId: string;
}

const Body: React.FC<BodyProps> = ({ initialMessages, conversationId }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 h-full overflow-y-auto flex flex-col first:mt-auto">
      {messages.map((message, i) => (
        <MessageBox isLast={i === messages.length - 1} key={message.id} data={message} />
      ))}
      <div ref={bottomRef} className="pt-10" />
    </div>
  );
};

export default Body;
