import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const useConversation = () => {
  const params = useParams();

  const converstationId = useMemo(() => {
    if (!params?.converstationId) {
      return '';
    }
    return params.converstationId as string;
  }, [params?.converstationId]);

  const isOpen = useMemo(() => !!converstationId, [converstationId]);

  return useMemo(
    () => ({
      isOpen,
      converstationId,
    }),
    [isOpen, converstationId],
  );
};

export default useConversation;
