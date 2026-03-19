import Link from "next/link";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

import { parseBlogHyperlinkUri, withLangPathPrefix } from "@/lib/resolve-blog-href";

type Props = {
  content: Document;
  assetMap: Map<string, unknown>;
  siteLang: string;
};

export function BlogPostBody({ content, assetMap, siteLang }: Props) {
  return (
    <article className="prose prose-lg prose-gray max-w-none break-words">
      {documentToReactComponents(content, {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => (
            <p className="mb-4 leading-7 text-gray-700">{children}</p>
          ),
          [BLOCKS.HEADING_1]: (node, children) => (
            <h1 className="mb-6 mt-8 text-3xl font-bold text-gray-900">{children}</h1>
          ),
          [BLOCKS.HEADING_2]: (node, children) => (
            <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900">{children}</h2>
          ),
          [BLOCKS.HEADING_3]: (node, children) => (
            <h3 className="mb-3 mt-6 text-xl font-bold text-gray-900">{children}</h3>
          ),
          [BLOCKS.HEADING_4]: (node, children) => (
            <h4 className="mb-2 mt-4 text-lg font-bold text-gray-900">{children}</h4>
          ),
          [BLOCKS.HEADING_5]: (node, children) => (
            <h5 className="mb-2 mt-4 text-base font-bold text-gray-900">{children}</h5>
          ),
          [BLOCKS.HEADING_6]: (node, children) => (
            <h6 className="mb-2 mt-4 text-sm font-bold text-gray-900">{children}</h6>
          ),
          [BLOCKS.UL_LIST]: (node, children) => (
            <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700">{children}</ul>
          ),
          [BLOCKS.OL_LIST]: (node, children) => (
            <ol className="mb-4 ml-6 list-decimal space-y-2 text-gray-700">{children}</ol>
          ),
          [BLOCKS.LIST_ITEM]: (node, children) => <li className="mb-1">{children}</li>,
          [BLOCKS.QUOTE]: (node, children) => (
            <blockquote className="my-4 border-l-4 border-gray-300 pl-4 italic text-gray-600">
              {children}
            </blockquote>
          ),
          [BLOCKS.HR]: () => <hr className="my-8 border-gray-300" />,
          [BLOCKS.EMBEDDED_ASSET]: (node) => {
            const assetId = node.data.target?.sys?.id;
            if (!assetId) {
              return null;
            }
            const asset = assetMap.get(assetId) as
              | {
                  fields?: {
                    file?: { url?: string; details?: { image?: { width?: number; height?: number } } };
                    title?: string;
                    description?: string;
                  };
                }
              | undefined;
            if (!asset) {
              return null;
            }
            const file = asset.fields?.file;
            if (!file?.url) {
              return null;
            }
            const imageUrl = file.url.startsWith("//") ? `https:${file.url}` : file.url;
            const alt = asset.fields?.title || asset.fields?.description || "Blog post image";
            const width = file.details?.image?.width || 1200;
            const height = file.details?.image?.height || 600;
            return (
              <div className="my-8">
                <Image
                  src={imageUrl}
                  alt={alt}
                  width={width}
                  height={height}
                  className="h-auto w-full rounded-lg object-cover"
                />
                {asset.fields?.description && (
                  <p className="mt-2 text-center text-sm text-gray-500">{asset.fields.description}</p>
                )}
              </div>
            );
          },
          [INLINES.HYPERLINK]: (node, children) => {
            const uri = String(node.data.uri || "");
            const parsed = parseBlogHyperlinkUri(uri);
            if (parsed.internal) {
              const href = withLangPathPrefix(parsed.pathnameSearchHash, siteLang);
              return (
                <Link href={href} className="text-blue-600 underline-offset-2 hover:underline">
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={uri}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline-offset-2 hover:underline"
              >
                {children}
              </a>
            );
          },
          [INLINES.ENTRY_HYPERLINK]: (node, children) => (
            <span className="text-blue-600">{children}</span>
          ),
        },
        renderMark: {
          [MARKS.BOLD]: (text) => <strong className="font-bold">{text}</strong>,
          [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
          [MARKS.UNDERLINE]: (text) => <u className="underline">{text}</u>,
          [MARKS.CODE]: (text) => (
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">{text}</code>
          ),
        },
      })}
    </article>
  );
}
