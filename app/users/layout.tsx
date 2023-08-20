import React from 'react';

// Components
import Sidebar from '../components/sibebar/Sidebar';

const UsersLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};

export default UsersLayout;
