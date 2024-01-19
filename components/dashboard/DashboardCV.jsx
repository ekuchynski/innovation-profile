import React from 'react'
import { Card, Col } from 'antd'

function DashboardCV({ profile })
{
   if (profile)
      return <Col span={24}>
         <Card title='About us'>
            <div dangerouslySetInnerHTML={{ __html: profile.description }} />
         </Card>
      </Col>
}

export default DashboardCV
