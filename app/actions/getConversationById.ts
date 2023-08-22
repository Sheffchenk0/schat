import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';
import { Conversation, User } from '@prisma/client';

const getConversationById = async (
  conversationId: string,
): Promise<(Conversation & { users: User[] }) | null> => {
  if (!conversationId) {
    console.log('2');
    return null;
  }
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      console.log('1');
      return null;
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { users: true },
    });

    if (!conversation) {
      return null;
    }

    return conversation;
  } catch (error: any) {
    return null;
  }
};

export default getConversationById;
