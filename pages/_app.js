import MainLayout from '@/components/layout/MainLayout'
import '@/styles/globals.css'
import "../public/fa/css/all.min.css";

export default function App({ Component, pageProps })
{
  return <MainLayout>
    {Component.getLayout ? Component.getLayout(<Component {...pageProps} />) : <Component {...pageProps} />}
  </MainLayout>
}
