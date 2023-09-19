import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react";
import theme from '../theme/theme';
import { useEffect, useState } from 'react';
import LoadingComponent from '../components/Loading';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, [Component]);

  return (
    <ChakraProvider theme={theme} resetCss={false} position="relative">
       {isLoading ? (
        <LoadingComponent />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </ChakraProvider>
  )
}

export default MyApp
