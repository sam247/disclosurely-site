import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { useMDXComponents } from 'nextra-theme-docs';

export const generateStaticParams = generateStaticParamsFor('slug');

export default async function DocsPage(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const result = await importPage(params.slug || []);
  const { default: MDXContent, toc, metadata } = result;
  const Wrapper = useMDXComponents().wrapper;
  
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
