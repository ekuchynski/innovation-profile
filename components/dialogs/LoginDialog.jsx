import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, Modal, Row } from 'antd'
import { useForm } from 'antd/es/form/Form';

function LoginDialog(props)
{
   const [modalOpen, setModalOpen] = useState(false);
   const [form] = useForm();

   async function submit()
   {

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

LoginDialog.propTypes = {}

export default LoginDialog
