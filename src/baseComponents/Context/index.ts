import React, { createContext } from 'react';

export interface DformContextProps {
  errorValue: Record<string, any>;
  changeForm: Record<string, any>;
  formFlag: boolean;
}

export const DformContext = createContext<DformContextProps>({
  errorValue: {},
  changeForm: {},
  formFlag: false,
});
