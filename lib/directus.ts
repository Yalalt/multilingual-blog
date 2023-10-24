import { createDirectus, rest, staticToken } from '@directus/sdk';

// if (!process.env.NEXT_PUBLIC_API_URL || !process.env.ADMIN_TOKEN) {
//     throw new Error('Environment variables NEXT_PUBLIC_API_URL and ADMIN_TOKEN are required.');
//   }

const directus = createDirectus(process.env.NEXT_PUBLIC_API_URL as string).with(staticToken(process.env.ADMIN_TOKEN as string)).with(rest());

export default directus;