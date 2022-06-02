import React, { createContext } from 'react';

export interface DformContextProps {
  errorValue: Record<string, any>;
  changeForm: Record<string, any>;
  formFlag: boolean;
  updateErrorValue: (res: string) => void;
}

export const DformContext = createContext<DformContextProps>({
  errorValue: {},
  changeForm: {},
  formFlag: false,
  updateErrorValue: () => {},
});
