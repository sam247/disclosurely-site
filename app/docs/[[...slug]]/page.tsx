import { notFound } from 'next/navigation';

// This file is required for Nextra to work with Next.js App Router
// Nextra will handle the routing automatically based on the docs directory structure

export default function DocsPage() {
  // This should never be reached as Nextra handles routing
  notFound();
}

