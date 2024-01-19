import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Col, Modal, Space } from 'antd'

function DashboardLinks(props)
{
   function notImplemented()
   {
      Modal.warning({ content: 'This functionality has not been implemented yet', maskClosable: true });
   }
   return (
      <Col span={24}>
         <Card>
            <Space wrap>
               <Button type='primary' danger onClick={notImplemented}>
                  <Space>
                     <i className='fa-solid fa-address-book' />
                     <span>Contact us</span>
                  </Space>
               </Button>
               <Button type='primary' danger onClick={notImplemented}>
                  <Space>
                     <i className='fa-solid fa-users' />
                     <span>Register as our customer</span>
                  </Space>
               </Button>
               <Button type='primary' danger onClick={notImplemented}>
                  <Space>
                     <i className='fa-solid fa-address-card' />
                     <span>Register as our vendor</span>
                  </Space>
               </Button>
               <Button type='primary' onClick={notImplemented}>
                  <Space>
                     <i className='fa-regular fa-globe' />
                     <span>Visit our website</span>
                  </Space>
               </Button>
               <Button type='primary' onClick={notImplemented}>
                  <Space>
                     <i className='fa-brands fa-linkedin' />
                     <span>Our LinkedIn profile</span>
                  </Space>
               </Button>
               <Button type='primary' onClick={notImplemented}>
                  <Space>
                     <i className='fa-brands fa-instagram' />
                     <span>Our Instagram profile</span>
                  </Space>
               </Button>
               <Button type='primary' onClick={notImplemented}>
                  Our ProZ.com profile
               </Button>
            </Space>
         </Card>
      </Col>
   )
}

DashboardLinks.propTypes = {}

export default DashboardLinks
