import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

async function readDoc(slug: string[]) {
  const base = path.join(process.cwd(), 'public', 'docs', ...slug);
  const candidates = [
    path.join(base, 'index.html'),
    path.join(process.cwd(), 'public', 'docs', `${slug.join('/')}.html`),
  ];

  for (const filePath of candidates) {
    try {
      const html = await fs.readFile(filePath, 'utf-8');
      return html;
    } catch {
      /* ignore */
    }
  }

  return null;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const html = await readDoc(slug || []);

  if (!html) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

