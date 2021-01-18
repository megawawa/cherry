import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MainNavbar from '../components/layout/navbar'
import { AppProps } from 'next/app'
import { ContextProvider } from '../components/layout/login'
import { useRouter } from 'next/router'
import React from 'react'
import { AccountContextProvider } from '../components/layout/accountContext'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ContextProvider>
      <AccountContextProvider>
        <MainNavbar {...pageProps} currentUrl={router.pathname} />
        <Component {...pageProps} />
      </AccountContextProvider>
    </ContextProvider >
  );
}

export default MyApp
