import '../styles/globals.css'
import "../styles/cyberpress.css"
import '../styles/bootstrap.css'
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

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, [Component]);

  return (
    <ChakraProvider theme={theme} resetCss={false} position="relative">
      <WalletContext>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </WalletContext>
    </ChakraProvider>
  )
}

export default MyApp
