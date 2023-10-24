import CTACard from '@/components/elements/cta-card';
import PaddingContainer from '@/components/layout/padding-container';
import PostCard from '@/components/post/post-card';
import PostList from '@/components/post/post-list';
import { DUMMY_POSTS } from '@/DUMMY_DATA';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { notFound } from 'next/navigation';

export default function Home({ params }: {
  params: {
    lang: string;
  }
}) {
  const getAllPosts = async () => {
    try {
      const posts = await directus.request(
        readItems('post', {
          fields: ['*', 'author.id', 'author.first_name', 'author.last_name', 'category.id', 'category.title'],
        })
      );
      return posts;
    } catch (error) {
      console.log(error);
      throw new Error('Error fetching posts');
    }
  };

  getAllPosts().then((posts) => {
    if (!posts) {
      notFound();
    }
  });
  // const pposts = await getAllPosts();
  // change DUMMY_POSTS to posts

  const locale = params.lang;

  return (
    <PaddingContainer>
      <main className='h-auto space-y-10'>
        <PostCard locale={locale} post={DUMMY_POSTS[0]} />
        <PostList locale={locale} posts={DUMMY_POSTS.filter((_post, index) => index > 0 && index < 3)} />
        <CTACard locale={locale} />
        <PostCard locale={locale} reverse post={DUMMY_POSTS[3]} />
        <PostList locale={locale} posts={DUMMY_POSTS.filter((_post, index) => index > 3 && index < 6)} />
      </main>
    </PaddingContainer>
  );
}
