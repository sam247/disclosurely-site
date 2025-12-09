import type { MDXComponents } from 'mdx/types';
import { useMDXComponents as useNextraMDXComponents } from 'nextra-theme-docs';

export function useMDXComponents(): MDXComponents {
  return useNextraMDXComponents();
}

