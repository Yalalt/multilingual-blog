import { DUMMY_POSTS } from '@/DUMMY_DATA';
import CTACard from '@/components/elements/cta-card';
import SocialLink from '@/components/elements/social-link';
import PaddingContainer from '@/components/layout/padding-container';
import PostBody from '@/components/post/post-body';
import PostHero from '@/components/post/post-hero';
import siteConfig from '@/config/site';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';

// Get Post Data from Directus
export const getPostData = cache(async (postSlug: string, locale: string) => {
  try {
    const post = await directus.request(
      readItems('post', {
        filter: {
          slug: {
            _eq: postSlug,
          },
        },
        fields: [
          '*',
          'category.id',
          'category.title',
          'author.id',
          'author.first_name',
          'author.last_name',
          'translations.*',
          'category.translations.*',
        ],
      })
    );

    const postData = post?.[0];

    if (locale === 'en') {
      return postData;
    } else {
      // if(locale === 'de') {
      const localisedPostData = {
        ...postData,
        title: postData?.translations[0].title,
        description: postData?.translations[0].description,
        body: postData?.translations[0].body,
        category: {
          ...postData?.category,
          title: postData?.category.translations[0].title,
        },
      };
      return localisedPostData;
    }
    // else {
    //   const localisedPostData = {
    //     ...postData,
    //     title: postData?.translations[1].title,
    //     description: postData?.translations[1].description,
    //     body: postData?.translations[1].body,
    //     category: {
    //       ...postData?.category,
    //       title: postData?.category.translations[1].title,
    //     }
    //   }
    //   return localisedPostData;
    // }
    // return post?.data?.[0];
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get post data');
  }
});

// Generate Metadata Function
export const generateMetadata = async ({
  params: { slug, lang },
}: {
  params: {
    slug: string;
    lang: string;
  };
}) => {
  // Get Post Data from Directus
  const post = await getPostData(slug, lang);

  return {
    title: post?.title,
    description: post?.description,
    openGraph: {
      title: post?.title,
      description: post.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${slug}`,
      siteName: post?.title,
      // images: [
      //   {
      //     url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${slug}/opengraph-image.png`,
      //     width: 1200,
      //     height: 630,
      //   },
      // ],
      locale: lang,
      type: 'website',
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${slug}`,
      languages: {
        'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/post/${slug}`,
        'de-DE': `${process.env.NEXT_PUBLIC_SITE_URL}/de/post/${slug}`,
        // "mn-MN": `${process.env.NEXT_PUBLIC_SITE_URL}/mn/post/${slug}`,
      },
    },
  };
};

// Generate Static Params Function
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
        lang: 'en',
      };
    });

    const localisedDeParams = posts?.map((post) => {
      return {
        slug: post.slug as string,
        lang: 'de',
      };
    });

    // const localisedMnParams = posts?.map((post) => {
    //   return {
    //     slug: post.slug as string,
    //     lang: 'mn',
    //   }
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
    slug: string;
    lang: string;
  };
}) => {
  // const post = DUMMY_POSTS.find((post) => post.slug === params.slug);
  const locale = params.lang;
  const postSlug = params.slug;

  const post = await getPostData(postSlug, locale);

  /** Structured Data for Google */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/post/${postSlug}/opengraph-image.png`,
    author: post.author.first_name + ' ' + post.author.last_name,
    genre: post.category.title,
    keywords: 'travel, travel blog, travel blog post, travel blog post title',
    publisher: siteConfig.siteName,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${postSlug}`,
    datePublished: new Date(post.date_created).toISOString(),
    dateCreated: new Date(post.date_created).toISOString(),
    dateModified: new Date(post.date_updated).toISOString(),
    description: post.description,
    articleBody: post.body,
  };

  if (!post) {
    notFound();
  }
  // check content loaded
  return (
    <PaddingContainer>
      {/* Add JSON-LD to your page */}
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Container */}
      <div className='space-y-10'>
        {/* Post hero */}
        <PostHero locale={locale} post={post} />
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
        <CTACard locale={locale} />
      </div>
    </PaddingContainer>
  );
};

export default Page;
