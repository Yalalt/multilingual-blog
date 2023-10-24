import { ImageResponse } from 'next/server';
import { getPostData } from './page';
import { getReadingTime, getRelativeDate } from '@/lib/helpers';
// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Explorer | Blog';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function og({ params: { slug, lang } }: { params: { slug: string; lang: string } }) {
  // Font
  const post = await getPostData(slug, lang);

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div tw='relative flex w-full h-full flex items-center justify-center'>
        {/* Background */}
        <div tw='absolute flex inset-0'>
          <img
            tw='flex flex-1 object-cover w-full h-full object-center'
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}`}
            alt={post?.title!!}
          />
          {/* Overlay */}
          <div tw='absolute flex inset-0 bg-black bg-opacity-50' />
        </div>
        <div tw='flex flex-col text-neutral-50'>
          {/* Title */}
          <div tw='text-[60px]'>{post?.title}</div>
          {/* Description */}
          <div tw='text-2xl max-w-4xl'>{post?.description}</div>
          {/* Tags */}
          <div tw='flex mt-6 flex-wrap items-center text-3xl text-neutral-200'>
            <div tw={`font-medium ${post?.category?.title === 'Cities' ? 'text-emerald-600' : 'text-indigo-600'}`}>
              {post?.category?.title}
            </div>
            <div tw='w-4 h-4 mx-6 rounded-full bg-neutral-300' />
            <div>{`${post?.author.first_name} ${post?.author.last_name}`}</div>
            <div tw='w-4 h-4 mx-6 rounded-full bg-neutral-300' />
            <div>{getReadingTime(post?.body!!, lang)}</div>
            <div tw='w-4 h-4 mx-6 rounded-full bg-neutral-300' />
            <div>{getRelativeDate(post?.date_created!!, lang)}</div>
          </div>
        </div>
      </div>
    )
  );
}
// export default async function Image() {
//   // Font
//   const interSemiBold = fetch(
//     new URL('./Inter-SemiBold.ttf', import.meta.url)
//   ).then((res) => res.arrayBuffer())

//   return new ImageResponse(
//     (
//       // ImageResponse JSX element
//       <div
//         style={{
//           fontSize: 128,
//           background: 'white',
//           width: '100%',
//           height: '100%',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         About Acme
//       </div>
//     ),
//     // ImageResponse options
//     {
//       // For convenience, we can re-use the exported opengraph-image
//       // size config to also set the ImageResponse's width and height.
//       ...size,
//       fonts: [
//         {
//           name: 'Inter',
//           data: await interSemiBold,
//           style: 'normal',
//           weight: 400,
//         },
//       ],
//     }
//   )
// }
