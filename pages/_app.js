import MainLayout from '@/components/layout/MainLayout'
import '@/styles/globals.css'
import "../public/fa/css/all.min.css";
import { useState } from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { ConfigProvider, Row } from 'antd';

export default function App({ Component, pageProps })
{
  const [supabase] = useState(() => createBrowserSupabaseClient('https://rcwsmyvrrukeqqwrllrw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjd3NteXZycnVrZXFxd3JsbHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ3MTUzNTMsImV4cCI6MjAyMDI5MTM1M30.8nl2uyFA2XoARYfr5iHOZgAdVxOdZe9FL1dENtkOWUA'));

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
