import { useState, useCallback } from 'react';
// true  false 切换hook
const useToggle = (initialState: boolean): [boolean, () => void, (val: boolean) => void] => {
  const [value, setValue] = useState<boolean>(initialState);
  const toggleValue = useCallback(() => setValue((prev) => !prev), []);
  const toggleSetValue = useCallback((val) => setValue(val), []);

  return [value, toggleValue, toggleSetValue];
};

export default useToggle;
