import PaddingContainer from '@/components/layout/padding-container';
import React from 'react';
import { DUMMY_CATEGORIES, DUMMY_POSTS } from '@/DUMMY_DATA';
import PostList from '@/components/post/post-list';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { notFound } from 'next/navigation';
import { Post } from '@/types/collection';

export const generateStaticParams = async () => {
  // return DUMMY_CATEGORIES.map((category) => {
  //   return {
  //     params: {
  //       category: category.slug,
  //     },
  //   };
  // });

  try {
    const categories = await directus.request(
      readItems('category', {
        filter: {
          status: {
            _eq: 'published',
          },
        },
        fields: ['slug'],
      })
    );

    const params = categories?.map((category) => {
      return {
        category: category.slug as string,
      }
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
    category: string;
    lang: string;
  };
}) => {
  // const category = DUMMY_CATEGORIES.find((category) => category.slug === params.category);
  const posts = DUMMY_POSTS.filter((post) => post.category.title.toLocaleLowerCase() === params.category);

  const locale = params.lang;

  const getCategoryData = async () => {
    try {
      const category = await directus.request(
        readItems('category', {
          filter: {
            slug: {
              _eq: params.category,
            },
          },
          fields: [
            '*',
            'posts.*',
            'posts.author.id',
            'posts.author.first_name',
            'posts.author.last_name',
            'posts.category.id',
            'posts.category.title',
          ],
        })
      );

      return category?.[0];
    } catch (error) {
      console.log(error);
      throw new Error('Error fetching category');
    }
  };

  const categories = await getCategoryData();

  if (!categories) {
    notFound();
  }

  const typeCorrectedCategory = categories as unknown as {
    id: string;
    title: string;
    description: string;
    slug: string;
    posts: Post[];
  };

  return (
    <PaddingContainer>
      <div className='mb-5 md:mb-10'>
        <h1 className='text-4xl font-semibold'>{typeCorrectedCategory?.title}</h1>
        <p className='text-lg text-neutral-600'>{typeCorrectedCategory?.description}</p>
      </div>
      <PostList locale={locale} posts={posts} />
    </PaddingContainer>
  );
};
export default Page;
