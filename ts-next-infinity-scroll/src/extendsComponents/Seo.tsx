import Head from 'next/head';

interface SeoProps {
  siteName: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogUrl?: string;
}

const Seo = ({ siteName, description, keywords, ogImage, ogUrl }: SeoProps) => {
  const prefixTitle = 'NextJs-BoilerPlates';
  const WebSiteTitle = `${prefixTitle} | ${siteName}`;
  return (
    <Head>
      <title>{WebSiteTitle}</title>
      <meta name="description" content={description} />
      {Array.isArray(keywords) && (
        <meta name="keywords" content={keywords.join(',')} />
      )}

      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:title" content={WebSiteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:title" content={WebSiteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="jigi-scripts.vercel.app" />
      <meta property="twitter:url" content={ogUrl} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
};

export default Seo;
