/* eslint-disable react/no-unescaped-entities */
import directus from '@/lib/directus';
import { createItem } from '@directus/sdk';
import { revalidateTag } from 'next/cache';
import Image from 'next/image';
import React from 'react';
import { getDictionary } from '@/lib/getDictionary';

const CTACard = async ({ locale }: { locale: string }) => {
  const dictionary = await getDictionary(locale);

  // const formAction = (formData: FormData) => {
  //   try {
  //     const email = formData.get('email');
  //     const subItems = directus.request(
  //       createItem('subscibers', {
  //         email,
  //       })
  //     );
  //     console.log('Subscribed successfully! ============>');
  //     console.log(subItems);

  //     revalidateTag("subscribers-count");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const subscribersCount = 12;
  // await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}items/subscribers?meta=total_count&access_token=${process.env.ADMIN_TOKEN}`,
  //   {
  //     next: {
  //       tags: ['subscribers-count'],
  //     },
  //   }
  // )
  //   .then((res) => res.json())
  //   .then((data) => data.meta.total_count)
  //   .catch((error) => console.log(error));

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
        <h3 className='mt-3 text-4xl font-semibold'>{dictionary.ctaCard.title}!</h3>
        <p className='max-w-lg mt-2 text-lg'>
          {dictionary.ctaCard.description}!
        </p>
        {/* Form */}
        <form
          key={subscribersCount + 'subscribers-form'}
          // action={formAction}
          className='flex items-center w-full gap-2 mt-6'
        >
          <input
            type='email'
            name='email'
            className='w-full px-3 py-2 bg-white/80 text-base rounded-md outline-none md:w-auto placeholder:text-sm focus:ring-2 ring-neutral-600'
            placeholder={dictionary.ctaCard.placeholder}
          />
          <button className='px-3 py-2 whitespace-nowrap rounded-md bg-neutral-900 text-neutral-200' type='submit'>
            {dictionary.ctaCard.button}
          </button>
        </form>

        {/* Subscribers count */}
        <div className='mt-5 text-neutral-700'>
          {dictionary.ctaCard.subscriberText1}{' '}
          <span className='px-2 py-1 text-sm rounded-md bg-neutral-700 text-neutral-100'>{subscribersCount}</span>
          {" "}{dictionary.ctaCard.subscriberText2}
        </div>
      </div>
    </div>
  );
};

export default CTACard;
