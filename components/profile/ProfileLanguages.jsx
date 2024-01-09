import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Col, List, Modal, Row, Space, Tag, Typography } from 'antd'
import { showApiError } from '@/utils/constants'

function ProfileLanguages(props)
{
   const [modalTemplatesOpen, setModalTemplatesOpen] = useState(false);
   const [loading, setLoading] = useState(false);
   const [templates, setTemplates] = useState();

   async function showTemplatesSelector()
   {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/templates?token=${token}`);
      setLoading(false);
      if (res.status !== 200)
      {
         await showApiError(res, 'Error while retrieving project templates');
         return;
      }
      const data = await res.json();
      setTemplates(data);
      setModalTemplatesOpen(true);
   }

   return (
      <Space direction='vertical'>
         <Typography>Here you can add LC project profiles which can be used by your visitors to quickly create a new project estimation</Typography>
         <Row>
            <Col span={24}>
               <Button type='primary' onClick={showTemplatesSelector}>Add new template</Button>
            </Col>
         </Row>
         <Modal title='Add a template'
            open={modalTemplatesOpen}
            onCancel={() => setModalTemplatesOpen(false)}
            footer={null}
            width={'90%'}
         >
            <List
               dataSource={templates}
               style={{ maxHeight: '400px', overflow: 'auto' }}

               rowKey={'id'}
               bordered={true}
               itemLayout='vertical'
               loading={loading}
               renderItem={(template => (<List.Item key={template.id} style={{ margin: '5px' }}>
                  <Space>
                     <Button>Select</Button>
                     <Space direction='vertical'>
                        <div>
                           {template.name}
                        </div>
                        {template.languageDirections && <Space wrap style={{ width: '100%' }}>
                           {template.languageDirections.map(ld => <Tag key={ld.id}>
                              {`${ld.sourceLanguage} - ${ld.targetLanguage}`}
                           </Tag>)}
                        </Space>}
                     </Space>
                  </Space>

               </List.Item>))}
            />
         </Modal>
      </Space>
   )
}

ProfileLanguages.propTypes = {
   data: PropTypes.array,
   setData: PropTypes.func
}

export default ProfileLanguages
