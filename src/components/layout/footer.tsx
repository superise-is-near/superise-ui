import React from 'react';
import logo from '~assets/favicon - dark-32x32.png';
import { FaTwitter } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';


export default  () => {
  return <div className="py-4 mt-8 border-t-2 border-gray-900 grid grid-cols-2">
    <div className="flex items-center self-start">
      <img src={logo} width="20px" />
      <div className="ml-2" />
      <span style={{ fontFamily: "Racing Sans One" }}>Surprise</span>
    </div>
    <div className="flex flex-col items-end">
      <div className="grid grid-col-1 gap-2">
        <a href="https://sixth-motion-b7e.notion.site/Surprise-Roadmap-813c17e1bd994f5c811eb5d5d076f00f" className="text-sm font-semibold underline" target="_blank">Roadmap <FiArrowUpRight style={{ display: 'inline-block' }} /></a>
        <a href="https://twitter.com/usesurprise" target="_blank"><FaTwitter /></a>
      </div>
    </div>
  </div>
}

