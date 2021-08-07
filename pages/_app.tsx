import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MainNavbar from '../components/layout/navbar'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { AccountContextProvider } from '../components/layout/accountContext'
import { Provider } from 'next-auth/client'
import * as gtag from '../libs/gtag'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <Provider session={pageProps.session}>
      <MainNavbar {...pageProps} currentUrl={router.pathname} />
      <AccountContextProvider>
        <Component {...pageProps} />
      </AccountContextProvider>
    </Provider>
  );
}

export default MyApp
