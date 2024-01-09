import MainLayout from '@/components/layout/MainLayout'
import '@/styles/globals.css'
import "../public/fa/css/all.min.css";
import { useState } from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { ConfigProvider, Row } from 'antd';

export default function App({ Component, pageProps })
{
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
    <ConfigProvider
      theme='light'
      componentSize='middle'
    >
      <MainLayout>
        {Component.getLayout ? Component.getLayout(<Component {...pageProps} />) : <Component {...pageProps} />}
      </MainLayout>
    </ConfigProvider>
  </SessionContextProvider>
}
