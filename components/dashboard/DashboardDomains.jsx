import React from 'react'
import { Card, Col, Collapse, Space, Typography } from 'antd'

function DashboardDomains({ profile })
{
   return <Col xs={24} md={12}>
      <Card title='Our specializations'>
         <Typography>Expand each section to see description of our experience in each domain</Typography>
         <Collapse accordion={true}>
            <Collapse.Panel header='Technology'>
               <Typography>Worked on over than 1000 projects during last 12 months, including projects for Microsoft, Apple. You can view feedback from main customers <Typography.Link>here</Typography.Link> </Typography>
            </Collapse.Panel>
            <Collapse.Panel header='Medicine'>
               <Typography>Some other description</Typography>
            </Collapse.Panel>
            <Collapse.Panel header='Oil & Gas'>
               <Typography>Some other description</Typography>
            </Collapse.Panel>
         </Collapse>
      </Card>
   </Col>
}

export default DashboardDomains
