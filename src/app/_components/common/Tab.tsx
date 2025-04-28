import {
  TabButtonProps,
  TabContextType,
  TabHeaderProps,
  TabPanelProps,
  TabProviderProps,
} from '@/app/_types/tab';
import { createContext, useContext, useState } from 'react';

const TabContext = createContext<TabContextType>({
  activeTabId: 0,
  onTabClick: () => {},
});

// Tab 관련 컴포넌트 전체를 감싸는 Provider 컴포넌트
const TabProvider = ({
  defaultTabId,
  onTabChange,
  children,
}: TabProviderProps) => {
  const [activeTabId, setActiveTabId] = useState(defaultTabId);

  const handleTabClick = (id: number) => {
    setActiveTabId(id);
    onTabChange?.(id);
  };

  return (
    <TabContext.Provider value={{ activeTabId, onTabClick: handleTabClick }}>
      {children}
    </TabContext.Provider>
  );
};

// TabButton을 감싸는 컨테이너
const TabHeader = ({ children }: TabHeaderProps) => {
  return <div className='mb-[20px] flex'>{children}</div>;
};

const TabButton = ({ id, children }: TabButtonProps) => {
  const { activeTabId, onTabClick } = useContext(TabContext);
  const isActive = activeTabId === id;

  return (
    <button
      onClick={() => onTabClick(id)}
      className={`${isActive ? 'border-b' : 'text-secondary-300'} border-primary-500 h-[50px] w-[70px] cursor-pointer text-[14px]`}
    >
      {children}
    </button>
  );
};

// 각 Tab에 해당하는 패널(보여줄 페이지)
const TabPanel = ({ id, children }: TabPanelProps) => {
  const { activeTabId } = useContext(TabContext);

  return activeTabId === id ? <>{children}</> : null;
};

export { TabProvider, TabHeader, TabButton, TabPanel };
