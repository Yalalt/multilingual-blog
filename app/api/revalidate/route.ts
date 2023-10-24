import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  // If there is no token, return an error 404
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  // Revalidate the post
  revalidatePath(`/[lang]/post/[slug]`);

  // Revalidate the categories
  revalidatePath(`/[lang]/category]`);

  // Revalidate the languages
  revalidatePath(`/[lang]/]`);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
