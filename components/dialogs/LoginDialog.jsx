import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Input, Modal, Row, notification } from 'antd'

function LoginDialog()
{
   const [modalOpen, setModalOpen] = useState(false);
   const [form] = Form.useForm();

   useEffect(() =>
   {
      const valTenant = localStorage.getItem('tenant');
      const valToken = localStorage.getItem('token');
      if (valTenant)
         form.setFieldValue('tenant', valTenant);
      if (valToken)
         form.setFieldValue('token', valToken);
   }, [])

   async function submit()
   {
      const values = form.getFieldsValue();
      if (values.token)
      {
         localStorage.setItem('token', values.token);
      }
      if (values.tenant)
      {
         localStorage.setItem('tenant', values.tenant);
      }
      notification.success({
         message: 'Token has been successfully saved.'
      })
      setModalOpen(false);
   }

   return (
      <>
         <Button onClick={() => setModalOpen(true)}>
            <i className='fa-solid fa-right-to-bracket' />
         </Button>
         <Modal
            title='Login'
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            onOk={submit}
         >
            <Form form={form} name='loginForm' layout='vertical'>
               <Row>
                  <Col span={24}>
                     <Form.Item name='tenant' label='Tenant ID'>
                        <Input />
                     </Form.Item>
                  </Col>
                  <Col span={24}>
                     <Form.Item name='token' label='Token' extra='Security token which will be used to send all requests to LC API.'>
                        <Input />
                     </Form.Item>
                  </Col>
               </Row>
            </Form>
         </Modal>
      </>
   )
}

export default LoginDialog
