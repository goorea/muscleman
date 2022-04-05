import React from 'react';

export type TabProps = {
  title: string;
  active: boolean;
  children: React.ReactElement | React.ReactElement[];
};

const Tab: React.FC<TabProps> = ({ children }) => <>{children}</>;

export default Tab;
