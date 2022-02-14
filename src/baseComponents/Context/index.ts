import React from 'react';

export interface DformContextProps {
  isPc: boolean;
}
export const DformContext = React.createContext<DformContextProps | null>(null);
