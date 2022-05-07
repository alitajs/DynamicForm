import React, { FC } from 'react';

interface HiddenProps {
  hidden: boolean;
  children: any;
}

const Hidden: FC<HiddenProps> = ({ children, hidden = false }) => {
  if (hidden) {
    return <div className="alitajs-dform-hide">{children}</div>;
  }
  return <React.Fragment>{children}</React.Fragment>;
};
export default Hidden;
