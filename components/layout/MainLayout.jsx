import Head from 'next/head'
import Image from 'next/image'
import { Button, Layout, Space } from 'antd';
const { Header, Content } = Layout;
import Link from 'next/link'
import LoginDialog from '@/components/dialogs/LoginDialog'
import Script from 'next/script';

export default function MainLayout(props)
{
   return (
      <Layout style={{ minHeight: '100vh' }}>
         <Head>
            <title>RWS Public profiles innovation</title>
            <meta name="description" content="Customizable public profile pages for RWS tenants" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Script src="../../fa/js/all.min.js" defer></Script>
         <Layout style={{ background: 'white' }}>
            <Header style={{ background: '#9D6F8A', position: 'sticky', top: 0, zIndex: 4, width: '100%', height: 'auto', lineHeight: '1', padding: '5px' }}>
               <div className='app-header'>
                  <div style={{ flexGrow: 20 }}>
                     <Link href={'/'}>
                        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                           <Image src={'/trados.svg'} width={120} height={30} style={{ objectFit: 'contain', margin: '3px', padding: '3px' }} alt='Логотип' />

                        </div>
                     </Link>
                  </div>
                  <div>
                     <Space>
                        <Link href={'/profile'}>
                           <Button>
                              <i className='fa-solid fa-gear' />
                           </Button>
                        </Link>
                        <LoginDialog />
                     </Space>
                  </div>
               </div>
            </Header>
            <Content style={{ padding: 10, marginTop: '0px', background: 'slategrey' }}>
               {props.children}
            </Content>
         </Layout>
      </Layout >
   )
}