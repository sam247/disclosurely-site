/**
 * Script to add internal links to blog posts in Contentful
 * Links to pages, docs, and other blog posts where contextually appropriate
 * Only adds links to first/strategic mentions, not every occurrence
 */

import { call_mcp_tool } from '../lib/mcp-helper';

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID || process.env.VITE_CONTENTFUL_SPACE_ID || 'rm7hib748uv7';
const ENVIRONMENT_ID = 'master'; // Default Contentful environment

// Internal pages to link to
const INTERNAL_PAGES = [
  { keywords: ['pricing', 'price', 'cost', 'subscription', 'plan'], path: '/pricing' },
  { keywords: ['features', 'feature', 'functionality'], path: '/features' },
  { keywords: ['compliance', 'compliance software'], path: '/compliance-software' },
  { keywords: ['whistleblowing directive', 'EU whistleblowing directive'], path: '/whistleblowing-directive' },
  { keywords: ['anonymous hotline', 'hotline'], path: '/anonymous-hotline' },
  { keywords: ['small business', 'SME', 'SMEs', 'small businesses'], path: '/solutions/small-business' },
  { keywords: ['security', 'secure'], path: '/security' },
];

// Keywords that should link to blog posts (will be populated from actual posts)
const BLOG_POST_KEYWORDS: Array<{ keywords: string[]; slug: string; title: string }> = [];

/**
 * Extract plain text from Contentful Rich Text document
 */
function extractTextFromRichText(doc: any): string {
  if (!doc || !doc.content) return '';
  
  let text = '';
  for (const node of doc.content) {
    if (node.nodeType === 'text') {
      text += node.value + ' ';
    } else if (node.content) {
      text += extractTextFromRichText(node) + ' ';
    }
  }
  return text.trim();
}

/**
 * Find first occurrence of keywords in text (case-insensitive)
 */
function findKeywordPosition(text: string, keywords: string[]): { index: number; keyword: string; length: number } | null {
  const lowerText = text.toLowerCase();
  let earliestIndex = Infinity;
  let matchedKeyword = '';
  let matchedLength = 0;

  for (const keyword of keywords) {
    const lowerKeyword = keyword.toLowerCase();
    const index = lowerText.indexOf(lowerKeyword);
    if (index !== -1 && index < earliestIndex) {
      earliestIndex = index;
      matchedKeyword = keyword;
      matchedLength = keyword.length;
    }
  }

  if (earliestIndex === Infinity) return null;
  return { index: earliestIndex, keyword: matchedKeyword, length: matchedLength };
}

/**
 * Convert text node to hyperlink node in Rich Text format
 */
function createHyperlinkNode(text: string, url: string): any {
  return {
    nodeType: 'paragraph',
    content: [
      {
        nodeType: 'hyperlink',
        data: {
          uri: url,
        },
        content: [
          {
            nodeType: 'text',
            value: text,
            marks: [],
            data: {},
          },
        ],
      },
    ],
    data: {},
  };
}

/**
 * Add internal links to a blog post's content
 */
async function addInternalLinksToPost(postId: string, postSlug: string, postTitle: string, content: any): Promise<any> {
  if (!content || !content.content) return content;

  const plainText = extractTextFromRichText(content);
  const updatedContent = JSON.parse(JSON.stringify(content)); // Deep clone

  // Track which links we've already added to avoid duplicates
  const addedLinks = new Set<string>();

  // Process each paragraph/node
  for (let i = 0; i < updatedContent.content.length; i++) {
    const node = updatedContent.content[i];
    
    if (node.nodeType === 'paragraph' && node.content) {
      const paragraphText = extractTextFromRichText(node);
      
      // Check for page links
      for (const page of INTERNAL_PAGES) {
        if (addedLinks.has(page.path)) continue; // Already linked this page
        
        const match = findKeywordPosition(paragraphText, page.keywords);
        if (match) {
          const fullUrl = `https://disclosurely.com${page.path}`;
          
          // Find the text node and convert to hyperlink
          for (let j = 0; j < node.content.length; j++) {
            const textNode = node.content[j];
            if (textNode.nodeType === 'text') {
              const nodeText = textNode.value.toLowerCase();
              const keywordLower = match.keyword.toLowerCase();
              
              if (nodeText.includes(keywordLower)) {
                // Split text node and create hyperlink
                const keywordIndex = nodeText.indexOf(keywordLower);
                const beforeText = textNode.value.substring(0, keywordIndex);
                const keywordText = textNode.value.substring(keywordIndex, keywordIndex + match.keyword.length);
                const afterText = textNode.value.substring(keywordIndex + match.keyword.length);
                
                const newContent: any[] = [];
                if (beforeText) {
                  newContent.push({
                    nodeType: 'text',
                    value: beforeText,
                    marks: textNode.marks || [],
                    data: {},
                  });
                }
                newContent.push({
                  nodeType: 'hyperlink',
                  data: { uri: fullUrl },
                  content: [
                    {
                      nodeType: 'text',
                      value: keywordText,
                      marks: textNode.marks || [],
                      data: {},
                    },
                  ],
                });
                if (afterText) {
                  newContent.push({
                    nodeType: 'text',
                    value: afterText,
                    marks: textNode.marks || [],
                    data: {},
                  });
                }
                
                node.content.splice(j, 1, ...newContent);
                addedLinks.add(page.path);
                break;
              }
            }
          }
        }
      }

      // Check for blog post links
      for (const blogPost of BLOG_POST_KEYWORDS) {
        if (blogPost.slug === postSlug) continue; // Don't link to self
        if (addedLinks.has(`/blog/${blogPost.slug}`)) continue;
        
        const match = findKeywordPosition(paragraphText, blogPost.keywords);
        if (match) {
          const fullUrl = `https://disclosurely.com/blog/${blogPost.slug}`;
          
          // Similar logic to add hyperlink
          for (let j = 0; j < node.content.length; j++) {
            const textNode = node.content[j];
            if (textNode.nodeType === 'text') {
              const nodeText = textNode.value.toLowerCase();
              const keywordLower = match.keyword.toLowerCase();
              
              if (nodeText.includes(keywordLower)) {
                const keywordIndex = nodeText.indexOf(keywordLower);
                const beforeText = textNode.value.substring(0, keywordIndex);
                const keywordText = textNode.value.substring(keywordIndex, keywordIndex + match.keyword.length);
                const afterText = textNode.value.substring(keywordIndex + match.keyword.length);
                
                const newContent: any[] = [];
                if (beforeText) {
                  newContent.push({
                    nodeType: 'text',
                    value: beforeText,
                    marks: textNode.marks || [],
                    data: {},
                  });
                }
                newContent.push({
                  nodeType: 'hyperlink',
                  data: { uri: fullUrl },
                  content: [
                    {
                      nodeType: 'text',
                      value: keywordText,
                      marks: textNode.marks || [],
                      data: {},
                    },
                  ],
                });
                if (afterText) {
                  newContent.push({
                    nodeType: 'text',
                    value: afterText,
                    marks: textNode.marks || [],
                    data: {},
                  });
                }
                
                node.content.splice(j, 1, ...newContent);
                addedLinks.add(`/blog/${blogPost.slug}`);
                break;
              }
            }
          }
        }
      }
    }
  }

  return updatedContent;
}

/**
 * Main function to process all blog posts
 */
async function main() {
  console.log('Starting internal linking process...');
  
  // First, fetch all blog posts to build keyword map
  console.log('Fetching all blog posts...');
  const postsResponse = await call_mcp_tool('user-contentful', 'search_entries', {
    spaceId: SPACE_ID,
    environmentId: ENVIRONMENT_ID,
    query: {
      content_type: '9oYANGj5uBRT6UHsl5LxO',
      limit: 100,
      include: 2,
    },
  });

  if (!postsResponse || !postsResponse.items) {
    console.error('Failed to fetch blog posts');
    return;
  }

  // Build keyword map from blog post titles
  for (const post of postsResponse.items) {
    const fields = post.fields || {};
    const title = fields.title?.['en-US'] || '';
    const slug = fields.slug?.['en-US'] || '';
    
    if (title && slug) {
      // Extract key phrases from title (first 3-4 words)
      const words = title.split(' ').slice(0, 4);
      BLOG_POST_KEYWORDS.push({
        keywords: [title, ...words],
        slug,
        title,
      });
    }
  }

  console.log(`Found ${BLOG_POST_KEYWORDS.length} blog posts to link to`);

  // Process each blog post
  for (const post of postsResponse.items) {
    const fields = post.fields || {};
    const postId = post.sys?.id;
    const title = fields.title?.['en-US'] || '';
    const slug = fields.slug?.['en-US'] || '';
    const content = fields.content?.['en-US'];
    const status = fields.status?.['en-US'];

    if (!postId || !title || !slug || !content || status !== 'published') {
      console.log(`Skipping ${title || 'unknown'} - missing required fields or not published`);
      continue;
    }

    console.log(`Processing: ${title}`);

    try {
      // Add internal links
      const updatedContent = await addInternalLinksToPost(postId, slug, title, content);

      // Update the entry in Contentful
      await call_mcp_tool('user-contentful', 'update_entry', {
        spaceId: SPACE_ID,
        environmentId: ENVIRONMENT_ID,
        entryId: postId,
        fields: {
          content: {
            'en-US': updatedContent,
          },
        },
      });

      console.log(`✓ Updated: ${title}`);
    } catch (error) {
      console.error(`✗ Error updating ${title}:`, error);
    }
  }

  console.log('Internal linking process complete!');
}

// Run the script
main().catch(console.error);

