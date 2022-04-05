import { useCallback, useState } from 'react';

const useCollapse = (): {
  collapsed: boolean;
  toggleCollapse: () => void;
} => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const toggleCollapse = useCallback(
    () => setCollapsed(prevCollapse => !prevCollapse),
    [],
  );

  return {
    collapsed,
    toggleCollapse,
  };
};

export default useCollapse;
