import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import useConversation from './useConversation';

const useRoutes = () => {
  const pathname = usePathname();
  const { converstationId } = useConversation();
  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/converstations',
        icon: HiChat,
        active: pathname === '/converstations' || !!converstationId,
      },
      {
        label: 'Users',
        href: '/users',
        icon: HiUsers,
        active: pathname === '/users',
      },
      { label: 'Logout', href: '#', onClick: () => signOut(), icon: HiArrowLeftOnRectangle },
    ],
    [pathname, converstationId],
  );

  return routes;
};

export default useRoutes;
