import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

const getConversations = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    return [];
  }
  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        OR: [
          { userIds: { has: currentUser?.id } },
          { users: { some: { id: { equals: currentUser?.id } } } },
        ],
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    if (!conversations) {
      return [];
    }

    return conversations;
  } catch (error: any) {
    return [];
  }
};

export default getConversations;
