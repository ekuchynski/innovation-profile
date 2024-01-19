import React from 'react'
import { Card, Col, Collapse, Space, Typography } from 'antd'

function DashboardLanguages({ profile })
{
   if (profile)
      return <Col xs={24} md={12}>
         <Card title='Languages we work with'>
            <Typography>Expand each section to see description of services provided in each language</Typography>
            <Collapse accordion={true}>
               <Collapse.Panel header='English => German'>
                  <ul>
                     <li>Translation</li>
                     <li>Proofreading</li>
                     <li>Voice-over</li>
                  </ul>
               </Collapse.Panel>
               <Collapse.Panel header='German => English'>
                  <ul>
                     <li>Translation</li>
                     <li>Proofreading</li>
                     <li>Voice-over</li>
                     <li>Subtitling</li>
                  </ul>
               </Collapse.Panel>
            </Collapse>
         </Card>
      </Col>
}

export default DashboardLanguages
