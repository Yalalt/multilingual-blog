/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import React from 'react';

const CTACard = () => {
  return (
    <div className='relative py-10 px-6 overflow-hidden rounded-md bg-slate-100'>
      {/* Overlay */}
      <div className='absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30'></div>
  
      {/* Image */}
      <Image
        src={'https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=eyJhcHBfaWQiOjEyMDd9'}
        fill
        alt='cta card image'
        className='object-cover object-center'
      />
      {/* Content Container */}
      <div className='relative z-20'>
        <div className='font-medium text-lg'>#explorertheworld</div>
        <h3 className='mt-3 text-4xl font-semibold'>Explorer the world with me!</h3>
        <p className='max-w-lg mt-2 text-lg'>
          Explorer the world with me! I'm traveling around the world. I've visited most of the great cities of USA and
          currently I'm travelling in Netherland. Join me!
        </p>
        {/* Form */}
        <form className='flex items-center w-full gap-2 mt-6'>
          <input
            type='text'
            className='w-full px-3 py-2 bg-white/80 text-base rounded-md outline-none md:w-auto placeholder:text-sm focus:ring-2 ring-neutral-600'
            placeholder='Write your email.'
          />
          <button className='px-3 py-2 whitespace-nowrap rounded-md bg-neutral-900 text-neutral-200'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default CTACard;
