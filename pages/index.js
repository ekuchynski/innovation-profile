import { Card, Typography } from 'antd'
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home()
{
  const [tenantId, setTenantId] = useState();

  useEffect(() =>
  {
    const val = localStorage.getItem('tenant');
    if (val)
      setTenantId(val);
  }, [])

  return (
    <Card title='Introduction'>
      <Typography.Paragraph>
        This is public profiles initiative for LC. Idea is to provide tenant owners to create public pages for their companies, where visitors can view main data about a company (CV, highlighted projects, presentation), some public charts representing recent work, widget for quick creation and estimation of a project, as well as other possible widgets (contact details, links to social media pages, vendor registration forms, etc).
      </Typography.Paragraph>
      <Typography.Paragraph>
        To start, click login button and enter your tenant ID and JWT token. Then go to the Settings page and provide basic configuration.
      </Typography.Paragraph>

      {tenantId &&
        <Typography.Link level={2} href={`/profile/${tenantId}`} style={{ fontWeight: 600, fontSize: '24px' }}>
          Visit my profile page
        </Typography.Link>
      }


    </Card>
  )
}
