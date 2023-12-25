import Link from "next/link";
import React from "react";
import LiveTvIcon from "@mui/icons-material/LiveTv";

const Footer = () => {
  return (
    <footer className=' text-white p-12 mt-10'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
        <div className='text-center md:text-left mb-6 md:mb-0'>
          <Link
            href={"/"}
            className='text-white text-2xl font-semibold flex items-center'
          >
            MOVIEPLUS
            <LiveTvIcon className='ml-1' />
          </Link>
          <p className='text-sm opacity-75'>Streaming Movies Since 2002</p>
        </div>
        <div className='flex space-x-6'>
          <a href='#' className='text-gray-400 hover:text-white transition'>
            Home
          </a>
          <a href='#' className='text-gray-400 hover:text-white transition'>
            About
          </a>
          <a href='#' className='text-gray-400 hover:text-white transition'>
            Contact
          </a>
        </div>
      </div>
      <div className='mt-8 border-t border-gray-700 pt-4 text-center md:text-left'>
        <p>&copy; 2023 Movie Plus. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
