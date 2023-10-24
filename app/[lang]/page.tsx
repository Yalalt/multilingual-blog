import CTACard from '@/components/elements/cta-card';
import PaddingContainer from '@/components/layout/padding-container';
import PostCard from '@/components/post/post-card';
import PostList from '@/components/post/post-list';
import { DUMMY_POSTS } from '@/DUMMY_DATA';
import directus from '@/lib/directus';
import { getDictionary } from '@/lib/getDictionary';
import { readItems } from '@directus/sdk';
import { notFound } from 'next/navigation';

export default function Home({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const locale = params.lang;

const getAllPosts = async () => {
    try {
      const posts = await directus.request(
        readItems('post', {
          fields: [
            '*',
            'author.id',
            'author.first_name',
            'author.last_name',
            'category.id',
            'category.title',
            'category.translations.*',
            'translations.*',
          ],
        })
      );
      
      if(locale === 'en') {
        return posts;
      // } else if(locale === 'de') {
      //   const localisedPosts = posts?.map((post) => {
      //     return {
      //       ...post,
      //       title: post.translations[0].title,
      //       description: post.translations[0].description,
      //       body: post.translations[0].body,
      //       category: {
      //         ...post.category,
      //         title: post.category.translations[0].title,
      //       }
      //     }
      //   });
      //   return localisedPosts;
      } else {
        const localisedPosts = posts?.map((post) => {
          return {
            ...post,
            title: post.translations[0].title,
            description: post.translations[0].description,
            body: post.translations[0].body,
            category: {
              ...post.category,
              title: post.category.translations[0].title,
            }
          }
        });
        return localisedPosts;
      }

      // return posts;
    } catch (error) {
      console.log(error);
      throw new Error('Error fetching posts');
    }
  };

    getAllPosts().then((posts) => {
    if (!posts) {
      notFound();
    }

    // return posts;
    // console.log("[POST] Posts page dotor ******");
    // console.log(posts);
    // posts.filter((_post, index) => index === 0);
  });

  const dictionary = await getDictionary(locale);
  // const posts = await getAllPosts(); not working!!!
  // change DUMMY_POSTS to posts
  // Data from DUMMY json file
  // get posts from function getAllPosts
  // display posts follow jsx

  return (
    <PaddingContainer>
      <main className='h-auto space-y-10'>
        <PostCard locale={locale} post={DUMMY_POSTS[0]} />
        <PostList locale={locale} posts={DUMMY_POSTS.filter((_post, index) => index > 0 && index < 3)} />
        {/* ---@ts-expect-error Async Server Component */}
        <CTACard dictionary={dictionary} />
        <PostCard locale={locale} reverse post={DUMMY_POSTS[3]} />
        <PostList locale={locale} posts={DUMMY_POSTS.filter((_post, index) => index > 3 && index < 6)} />
      </main>
    </PaddingContainer>
  );
}
