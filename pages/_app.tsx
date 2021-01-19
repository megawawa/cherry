import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MainNavbar from '../components/layout/navbar'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React from 'react'
import { AccountContextProvider } from '../components/layout/accountContext'
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <Provider session={pageProps.session}>
      <AccountContextProvider>
        <MainNavbar {...pageProps} currentUrl={router.pathname} />
        <Component {...pageProps} />
      </AccountContextProvider>
    </Provider>
  );
}

export default MyApp
