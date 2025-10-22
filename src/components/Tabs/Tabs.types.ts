import { ReactNode } from 'react';

export type TabItem = { id: string; label: string; content: ReactNode };

export interface TabsProps {
  items: TabItem[];
  defaultTabId?: string;
}
