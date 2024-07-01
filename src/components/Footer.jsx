import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {
  return (
    <footer className='sm:px-10 px-5 py-5'>
      <div className="screen-max-width">
        <div>
          <p className='font-semibold text-gray text-xs'>
            More ways to shop: {' '}
            <span className='underline text-blue'>
              Find an Apple Store
            </span>
            {' '} or {' '}
            <span className='underline text-blue'>
              other retailer
            </span>
            {' '}near you.
          </p>
          <p className='font-semibold text-gray text-xs'>
            Or call +234 0704 899
          </p>
        </div>
        <div className='bg-neutral-600 my-5 h-[1px] w-full' />
        <div className='flex flex-col md:flex-row justify-between'>
          <p className='font-semibold text-gray text-xs'>
            Copyright 2024 Apple Inc. All rights reserved.
          </p>
          <ul className='flex gap-x-4'>
            {footerLinks.map((link, index) => (
              <li key={index} className='text-xs text-gray hover:text-white cursor-pointer'>
                {link}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
