import { DUMMY_POSTS } from '@/DUMMY_DATA';
import CTACard from '@/components/elements/cta-card';
import SocialLink from '@/components/elements/social-link';
import PaddingContainer from '@/components/layout/padding-container';
import PostBody from '@/components/post/post-body';
import PostHero from '@/components/post/post-hero';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { read } from 'fs';
import { notFound } from 'next/navigation';
import React from 'react';

export const generateStaticParams = async () => {
  // return DUMMY_POSTS.map((post) => {
  //   return {
  //     slug: post.slug,
  //   };
  // });
  try {
    const posts = await directus.request(
      readItems('post', {
        filter: {
          status: {
            _eq: 'published',
          },
        },
        fields: ['slug'],
      })
    );
    const params = posts?.map((post) => {
      return {
        slug: post.slug as string,
      };
    });
    return params || [];
  } catch (error) {
    console.log(error);
    throw new Error('Failed to generate static params');
  }
};

const Page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  // const post = DUMMY_POSTS.find((post) => post.slug === params.slug);

  const getPostData = async () => {
    try {
      const post = await directus.request(
        readItems('post', {
          filter: {
            slug: {
              _eq: params.slug,
            },
          },
          fields: ['*', 'post.id', 'post.title', 'author.id', 'author.first_name', 'author.last_name'],
          // fields: ['*', 'category.id', 'category.title', 'author.id', 'author.first_name', 'author.last_name'],
        })
      );

      return post?.[0];
    } catch (error) {
      console.log(error);
      throw new Error('Failed to get post data');
    }
  };

  const post = await getPostData();

  if (!post) {
    notFound();
  }

  return (
    <PaddingContainer>
      {/* Container */}
      <div className='space-y-10'>
        {/* Post hero */}
        <PostHero post={post} />
        {/* Post Body and Social share buttons */}
        <div className='flex flex-col gap-10 md:flex-row'>
          <div className='relative'>
            <div className='sticky flex items-center gap-3 md:flex-col top-20'>
              <div className='font-medium md:hidden'>Share this content:</div>
              <SocialLink
                isShareURL
                platform='facebook'
                link={`https://facebook.com/sharer.php?u=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
              <SocialLink
                isShareURL
                platform='twitter'
                link={`https://twitter.com/intent/tweet?url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
              <SocialLink
                isShareURL
                platform='linkedin'
                link={`https://www.linkedin.com/shareArticle?mini=true&url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
            </div>
          </div>
          <PostBody body={post.body} />
        </div>
        {/* CTA Card */}
        <CTACard />
      </div>
    </PaddingContainer>
  );
};

export default Page;
