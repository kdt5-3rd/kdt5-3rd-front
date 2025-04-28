import { ReactNode } from 'react';

export interface TabContextType {
  activeTabId: number;
  onTabClick: (id: number) => void;
}

export interface TabProviderProps {
  defaultTabId: number;
  onTabChange?: (activeTabId: number) => void;
  children: ReactNode;
}

export interface TabHeaderProps {
  children: ReactNode;
}

export interface TabButtonProps {
  id: number;
  children: ReactNode;
}

export interface TabPanelProps {
  id: number;
  children: ReactNode;
}
