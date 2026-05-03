import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Vedant Sonawane'
const BASE_URL = 'https://vedant-sonawane-portfolio.in'

export default function Seo({
  title,
  description,
  path = '/',
  image = '/vedant-sonawane-profile.jpg',
  keywords,
  structuredData,
}) {
  const canonicalUrl = `${BASE_URL}${path}`
  const imageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`
  const pageTitle = title || `${SITE_NAME} | Official Portfolio`

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <link rel="canonical" href={canonicalUrl} />
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={imageUrl} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}
