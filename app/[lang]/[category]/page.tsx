import PaddingContainer from '@/components/layout/padding-container';
import React, { cache } from 'react';
import { DUMMY_CATEGORIES, DUMMY_POSTS } from '@/DUMMY_DATA';
import PostList from '@/components/post/post-list';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { notFound } from 'next/navigation';
import { Post } from '@/types/collection';

// Get Category Data from Directus
export const getCategoryData = cache(async (categorySlug: string, locale: string) => {
  try {
    const category = await directus.request(
      readItems('category', {
        filter: {
          slug: {
            _eq: categorySlug,
          },
        },
        fields: [
          '*',
          'translations.*',
          'posts.*',
          'posts.author.id',
          'posts.author.first_name',
          'posts.author.last_name',
          'posts.category.id',
          'posts.category.title',
          'posts.translations.*',
        ],
      })
    );

    if (locale === 'en') {
      return category?.[0];
    } else {
      // if (locale === 'de') {
      // Germany
      const fetchedCategory = category?.[0];
      // const fetchedCategory = category?.data?.[0];
      const localisedCategory = {
        // ...category?.data?.[0],
        ...fetchedCategory,
        title: fetchedCategory?.translations[0].title,
        description: fetchedCategory?.translations[0].description,
        posts: fetchedCategory?.posts?.map((post: any) => {
          return {
            ...post,
            title: post.translations[0].title,
            description: post.translations[0].description,
            body: post.translations[0].body,
            category: {
              ...post.category,
              title: fetchedCategory?.translations[0].title,
            },
          };
        }),
      };
      return localisedCategory;
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching category');
  }
});

// Generate Metadata Function
export const generateMetadata = async ({
  params: { category, lang },
}: {
  params: {
    category: string;
    lang: string;
  };
}) => {
  // Get Data from Directus
  const categoryData = await getCategoryData(category, lang);
  // Dynamaic Title
  return {
    title: {
      absolute: categoryData?.title,
    },
    description: categoryData?.description,
    openGraph: {
      title: categoryData?.title,
      description: categoryData.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}`,
      siteName: categoryData?.title,
      // images: [
      //   {
      //     url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}/opengraph-image.png`,
      //     width: 1200,
      //     height: 630,
      //   },
      // ],
      locale: lang,
      type: 'website',
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${category}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/${category}`,
        "de-DE": `${process.env.NEXT_PUBLIC_SITE_URL}/de/${category}`,
        // "mn-MN": `${process.env.NEXT_PUBLIC_SITE_URL}/mn/${category}`,
      }
    }
  }
};

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
        lang: 'en',
      };
    });

    const localisedDeParams = categories?.map((category) => {
      return {
        category: category.slug as string,
        lang: 'de',
      };
    });

    // const localisedMnParams = categories?.map((category) => {
    //   return {
    //     category: category.slug as string,
    //     lang: 'mn',
    //   };
    // });

    const allParams = params?.concat(localisedDeParams ?? []);

    return allParams || [];
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
  // Post translation in category Cities and Experience
  // const category = DUMMY_CATEGORIES.find((category) => category.slug === params.category);
  // const posts = DUMMY_POSTS.filter((post) => post.category.title.toLocaleLowerCase() === params.category);

  const locale = params.lang;
  const categorySlug = params.category;

  const categories = await getCategoryData(categorySlug, locale);

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
  // Check to load data on typeCorrectedCategory
  return (
    <PaddingContainer>
      <div className='mb-5 md:mb-10'>
        <h1 className='text-4xl font-semibold'>{typeCorrectedCategory?.title}</h1>
        <p className='text-lg text-neutral-600'>{typeCorrectedCategory?.description}</p>
      </div>
      <PostList locale={locale} posts={typeCorrectedCategory.posts} />
    </PaddingContainer>
  );
};
export default Page;
