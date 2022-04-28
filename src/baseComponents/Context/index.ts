import React, { createContext } from 'react';

export interface DformContextProps {
  errorValue: Record<string, any>;
  changeForm: Record<string, any>;
}

export const DformContext = createContext<DformContextProps>({
  errorValue: {},
  changeForm: {},
});
