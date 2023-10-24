import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL as string;

  // Get Posts
  const posts = await directus.request(
    readItems('post', {
      fields: ['slug', 'date_updated'],
    })
  );

  const postLinks = posts?.map((post) => {
    return [
      {
        url: `${baseURL}/en/blog/${post.slug}`,
        lastModified: new Date(post.date_updated),
      },
      {
        url: `${baseURL}/de/blog/${post.slug}`,
        lastModified: new Date(post.date_updated),
      },
      {
        url: `${baseURL}/mn/blog/${post.slug}`,
        lastModified: new Date(post.date_updated),
      },
      {
        url: `${baseURL}/blog/${post.slug}`,
        lastModified: new Date(post.date_updated),
      },
    ];
  });

  // Get Categories
  const categories = await directus.request(
    readItems('category', {
      fields: ['slug', 'date_updated'],
    })
  );

  const categoryLinks = categories?.map((category) => {
    return [
      {
        url: `${baseURL}/en/${category.slug}`,
        lastModified: new Date(),
      },
      {
        url: `${baseURL}/de/${category.slug}`,
        lastModified: new Date(),
      },
      {
        url: `${baseURL}/mn/${category.slug}`,
        lastModified: new Date(),
      },
      {
        url: `${baseURL}/${category.slug}`,
        lastModified: new Date(),
      },
    ];
  });

  const dynamicLinks = postLinks?.concat(categoryLinks ?? []).flat() ?? [];

  return [
    {
      url: baseURL,
      lastModified: new Date(),
      //   changeFrequency: 'weekly',
      //   priority: 1,
    },
    {
      url: `${baseURL}/en`,
      lastModified: new Date(),
      //   changeFrequency: 'monthly',
      //   priority: 0.8,
    },
    {
      url: `${baseURL}/de`,
      lastModified: new Date(),
      //   changeFrequency: 'yearly',
      //   priority: 0.5,
    },
    ...dynamicLinks,
  ];
}
