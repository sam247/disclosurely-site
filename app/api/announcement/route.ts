import { NextResponse } from 'next/server';
import { contentfulClient } from '@/lib/contentful';

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    if (!contentfulClient) {
      return NextResponse.json({ announcement: null });
    }

    const response = await contentfulClient.getEntries({
      content_type: 'announcement',
      'fields.status': 'published',
      limit: 1,
    } as any);

    if (response.items.length > 0) {
      const item = response.items[0];
      const fields = item.fields as any;

      return NextResponse.json({
        announcement: {
          id: item.sys.id,
          message: fields.message || '',
          displayOnDashboard: fields.displayOnDashboard || false,
          displayOnFrontend: fields.displayOnFrontend || false,
          linkUrl: fields.linkUrl,
          linkText: fields.linkText,
        },
      });
    }

    return NextResponse.json({ announcement: null });
  } catch (error) {
    console.error('Error fetching announcement:', error);
    return NextResponse.json({ announcement: null });
  }
}

