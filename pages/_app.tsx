import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MainNavbar from '../components/navbar'
import { AppProps } from 'next/app'
import { ContextProvider } from '../components/login'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ContextProvider>
      <MainNavbar {...pageProps} />
      <Component {...pageProps} />
    </ContextProvider >
  );
}

export default MyApp
