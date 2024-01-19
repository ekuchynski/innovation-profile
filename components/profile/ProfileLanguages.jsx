import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Col, Form, Input, List, Modal, Row, Space, Tag, Typography } from 'antd'
import { showApiError, GetToken } from '@/utils/constants'
import { v4 } from 'uuid';

function ProfileLanguages({ data, setData, profile })
{
   const [modalTemplatesOpen, setModalTemplatesOpen] = useState(false);
   const [modalAddTemplateOpen, setModalAddTemplateOpen] = useState(false);
   const [loading, setLoading] = useState(false);
   const [templates, setTemplates] = useState();
   const [selectedTemplate, setSelectedTemplate] = useState();

   const [form] = Form.useForm();

   async function showTemplatesSelector()
   {
      setLoading(true);
      const token = await GetToken();
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

   function selectTemplate(template)
   {
      form.setFieldValue('name', template.name);
      setSelectedTemplate(template);
      setModalTemplatesOpen(false);
      setModalAddTemplateOpen(true);
   }

   function applyTemplate()
   {
      const values = form.getFieldsValue();
      let langs = [];
      selectedTemplate.languageDirections.map(ld =>
      {
         langs.push(`${ld.sourceLanguage.languageCode} > ${ld.targetLanguage.languageCode}`);
      });
      setData(old => [...old, {
         id: v4(),
         profileId: profile.id,
         templateId: selectedTemplate.id,
         languages: langs.join(', '),
         description: values.description,
         name: values.name
      }]);
      setModalTemplatesOpen(false);
      setModalAddTemplateOpen(false);
   }

   return (
      <Space direction='vertical' style={{ width: '100%' }}>
         <Typography>Here you can add LC project profiles which can be used by your visitors to quickly create a new project estimation</Typography>
         <Row gutter={[10, 10]}>
            <Col span={24}>
               <Button type='primary' onClick={showTemplatesSelector}>Add new template</Button>
            </Col>
            <Col span={24}>
               <List
                  dataSource={data}
                  style={{ maxHeight: '400px', overflow: 'auto', width: '100%' }}

                  rowKey={'id'}
                  bordered={true}
                  itemLayout='vertical'
                  loading={loading}
                  renderItem={(template => (<List.Item key={template.id} style={{ margin: '5px' }}>
                     <Space direction='vertical'>
                        <Typography>
                           {template.name}
                        </Typography>
                        <Typography.Text type='secondary'>
                           {template.description}
                        </Typography.Text>
                        <Typography.Text>
                           {template.languages}
                        </Typography.Text>
                     </Space>
                  </List.Item>))}
               />
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
                     <Button onClick={() => selectTemplate(template)}>Select</Button>
                     <Space direction='vertical'>
                        <div>
                           {template.name}
                        </div>
                        {template.languageDirections && <Space wrap style={{ width: '100%' }}>
                           {template.languageDirections.map(ld => <Tag key={ld.id}>
                              {`${ld.sourceLanguage.languageCode} - ${ld.targetLanguage.languageCode}`}
                           </Tag>)}
                        </Space>}
                     </Space>
                  </Space>

               </List.Item>))}
            />
         </Modal>
         <Modal
            title='Adding a template'
            open={modalAddTemplateOpen}
            onCancel={() => setModalAddTemplateOpen(false)}
            onOk={applyTemplate}
         >
            <Form form={form}>
               <Row gutter={[10, 10]}>
                  <Col span={24}>
                     <Form.Item name={'name'} label='Template name'>
                        <Input />
                     </Form.Item>
                  </Col>
                  <Col span={24}>
                     <Form.Item name={'description'} label='Description of a template'>
                        <Input />
                     </Form.Item>
                  </Col>
               </Row>
            </Form>
         </Modal>
      </Space>
   )
}

ProfileLanguages.propTypes = {
   data: PropTypes.array,
   setData: PropTypes.func,
   profile: PropTypes.object
}

export default ProfileLanguages
