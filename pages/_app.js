import '../styles/bootstrap.css'
import '../styles/globals.css'
import "../styles/cyberpress.css"
import "../styles/gallery.css"
import "../styles/fontawsome.css"
import "../styles/wpblock.css"
import "../styles/ghostkit.css"
import "../styles/woocommerce.css"
import { ChakraProvider } from "@chakra-ui/react";
import theme from '../theme/theme';
import { useEffect, useState } from 'react';
import LoadingComponent from '../components/Loading';
import Layout from '../components/Layout';
import WalletContext from '../components/WalletContext'
import Head from 'next/head'
import { SEO_CONTENT, _window } from '../utils/seo'
import { appWithTranslation } from 'next-i18next'
import Script from 'next/script'
import { GoogleOAuthProvider } from '@react-oauth/google'

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, [Component]);

  return (
    <>
      <Head>
        <meta name="robots" content="index,follow" />
        <meta name="description" content={SEO_CONTENT.description} />

        {/* TWITTER */}
        <meta name="twitter:title" content={SEO_CONTENT.title} />
        <meta name="twitter:description" content={SEO_CONTENT.description} />
        <meta name="twitter:image" content={SEO_CONTENT.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={SEO_CONTENT.twitter} />

        {/* NORMAL */}
        <meta property="title" content={SEO_CONTENT.title} />
        <meta property="site_name" content={SEO_CONTENT.siteName} />
        <meta property="description" content={SEO_CONTENT.description} />
        <meta property="url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="type" content="website" />
        <meta property="image" content={SEO_CONTENT.image} />
        <meta property="image:type" content="image/png" />
        <meta property="locale" content="jp_JA" />

        {/* Open Graph */}
        <meta property="og:title" content={SEO_CONTENT.title} />
        <meta property="og:description" content={SEO_CONTENT.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:image" content={SEO_CONTENT.image} />

        <meta name="theme-color" content="#00000099" />

      </Head>
      {/* Google Tag Manager */}
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`} />
      <Script id='ga' strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          height="0" 
          width="0"
          style={{ visibility: 'hidden', display: 'none' }}
        />
      </noscript>
      {/* End Google Tag Manager (noscript) */}
      {/* End Google Tag Manager */}
      <ChakraProvider theme={theme} resetCss={false} position="relative">
      <GoogleOAuthProvider>
          <WalletContext>
            {isLoading ? (
              <LoadingComponent />
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </WalletContext>
        </GoogleOAuthProvider>
      </ChakraProvider>
    </>
  )
}

export default appWithTranslation(MyApp);
