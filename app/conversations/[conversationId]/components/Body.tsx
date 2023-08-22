'use client';

import { Conversation } from '@prisma/client';
import React from 'react';

interface BodyProps {
  conversation: Conversation & { users: User[] };
}

const Body: React.FC<BodyProps> = ({ conversation }) => {
  return <div className="flex-1 overflow-y-auto">Body</div>;
};

export default Body;
