import React, { FC } from 'react';
import QRCode from '../assets/QRCode.png';

const Page: FC = () => (
  <a href="https://dist.xiaohuoni.now.sh/" target="_blank" rel="noopener noreferrer">
    <img src={QRCode} />
  </a>
);

export default Page;
