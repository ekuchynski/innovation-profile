import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Dashboard from '@/components/dashboard/Dashboard'
import { Badge, Button, Col, Dropdown, FloatButton, Layout, Modal, Row, Space, Spin, Tooltip, Typography } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import Link from 'next/link'
import LoginDialog from '@/components/dialogs/LoginDialog'

const inter = Inter({ subsets: ['latin'] })

export default function Home()
{
  return (
    <>
      <Head>
        <title>RWS Public profiles innovation</title>
        <meta name="description" content="Customizable public profile pages for RWS tenants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </>
  )
}
