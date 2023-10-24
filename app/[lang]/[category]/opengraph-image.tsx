import { ImageResponse } from 'next/server';
import { getCategoryData } from './page';
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
export default async function og({ params: { category, lang } }: { params: { category: string; lang: string } }) {
  // Font
  const categoryData = await getCategoryData(category, lang);

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div tw='relative flex w-full h-full flex items-center justify-center'>
        {/* Background */}
        <div tw='absolute flex inset-0'>
          <img
            tw='flex flex-1 object-cover w-full h-full object-center'
            src='https://images.unsplash.com/photo-1508050919630-b135583b29ab?ixid=MnwzODU2NTF8MHwxfHNlYXJjaHw5fHxwYXJpc3xlbnwwfHx8fDE2NzAyNzMzNDg&ixlib=rb-4.0.3'
            alt='Explorer'
          />
          {/* Overlay */}
          <div
            tw={`absolute flex inset-0 bg-opacity-80 ${
              categoryData?.title === 'Cities' || categoryData?.title === 'Städte' ? 'bg-emerald-600' : 'bg-indigo-600'
            }`}
          />
        </div>
        <div tw='flex flex-col text-white'>
          {/* Title */}
          <div tw='text-[60px]'>{categoryData?.title}</div>
          {/* Description */}
          <div tw='text-2xl max-w-4xl'>{categoryData?.description}</div>
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
