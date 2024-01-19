import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Col, Form, Image, Input, List, Modal, Row, Space, Tag, Typography } from 'antd'
import { showApiError, GetToken } from '@/utils/constants'
import { v4 } from 'uuid';

function ProfileProjects({ data, setData, profile })
{
   const [modalProjectsOpen, setModalProjectsOpen] = useState(false);
   const [modalAddProjectOpen, setModalAddProjectOpen] = useState(false);
   const [loading, setLoading] = useState(false);
   const [projects, setProjects] = useState();
   const [selectedProject, setSelectedProject] = useState();

   const [form] = Form.useForm();

   async function showProjectsSelector()
   {
      setLoading(true);
      const token = await GetToken();
      const res = await fetch(`/api/projects?token=${token}`);
      setLoading(false);
      if (res.status !== 200)
      {
         await showApiError(res, 'Error while retrieving projects');
         return;
      }
      const data = await res.json();
      setProjects(data);
      setModalProjectsOpen(true);
   }

   function selectProject(project)
   {
      form.setFieldValue('name', project.name);
      form.setFieldValue('description', project.description);
      setSelectedProject(project);
      setModalProjectsOpen(false);
      setModalAddProjectOpen(true);
   }

   function applyProject()
   {
      const values = form.getFieldsValue();
      let langs = [];
      selectedProject.languageDirections.map(ld =>
      {
         langs.push(`${ld.sourceLanguage.languageCode} > ${ld.targetLanguage.languageCode}`);
      });
      setData(old => [...old, {
         id: v4(),
         profileId: profile.id,
         projectId: selectedProject.id,
         languages: langs.join(', '),
         description: values.description,
         name: values.name,
         extract1_source: values.source,
         extract1_target: values.target,
         image_url: values.image,
         volume: selectedProject.analysisStatistics.total.words
      }]);
      setModalProjectsOpen(false);
      setModalAddProjectOpen(false);
   }

   return (
      <Space direction='vertical' style={{ width: '100%' }}>
         <Typography>Here you can add highlighted LC projects which to demonstrate your experience to your visitors</Typography>
         <Row gutter={[10, 10]}>
            <Col span={24}>
               <Button type='primary' onClick={showProjectsSelector}>Add new project</Button>
            </Col>
            <Col span={24}>
               <List
                  dataSource={data}
                  style={{ maxHeight: '400px', overflow: 'auto', width: '100%' }}

                  rowKey={'id'}
                  bordered={true}
                  itemLayout='vertical'
                  loading={loading}
                  renderItem={(project => (<List.Item key={project.id} style={{ margin: '5px' }}>
                     <Row gutter={[20, 10]}>
                        <Col span={6}>
                           <Image src={project.image_url} alt='Image' />
                        </Col>
                        <Col span={18}>
                           <Space direction='vertical'>
                              <Typography style={{ fontSize: '18px', fontWeight: 600 }}>
                                 {project.name}
                              </Typography>
                              <Typography.Text type='secondary'>
                                 {project.description}
                              </Typography.Text>
                              <Typography.Text>
                                 Languages: {project.languages}
                              </Typography.Text>
                              <Typography.Text>
                                 Volume: {project.volume}
                              </Typography.Text>
                           </Space>
                        </Col>
                     </Row>

                  </List.Item>))}
               />
            </Col>
         </Row>
         <Modal title='Add a project'
            open={modalProjectsOpen}
            onCancel={() => setModalProjectsOpen(false)}
            footer={null}
            width={'90%'}
         >
            <List
               dataSource={projects}
               style={{ maxHeight: '400px', overflow: 'auto' }}

               rowKey={'id'}
               bordered={true}
               itemLayout='vertical'
               loading={loading}
               renderItem={(project => (<List.Item key={project.id} style={{ margin: '5px' }}>
                  <Space>
                     <Button onClick={() => selectProject(project)}>Select</Button>
                     <Space direction='vertical'>
                        <div>
                           {project.name}
                        </div>
                        {project.languageDirections && <Space wrap style={{ width: '100%' }}>
                           {project.languageDirections.map(ld => <Tag key={ld.id}>
                              {`${ld.sourceLanguage.languageCode} - ${ld.targetLanguage.languageCode}`}
                           </Tag>)}
                        </Space>}
                     </Space>
                  </Space>

               </List.Item>))}
            />
         </Modal>
         <Modal
            title='Adding a project'
            open={modalAddProjectOpen}
            onCancel={() => setModalAddProjectOpen(false)}
            onOk={applyProject}
            width={'95%'}
         >
            <Form form={form} layout='vertical'>
               <Row gutter={[10, 10]}>
                  <Col span={24}>
                     <Form.Item name={'name'} label='Project name'>
                        <Input />
                     </Form.Item>
                  </Col>
                  <Col span={24}>
                     <Form.Item name={'description'} label='Description of a project'>
                        <Input />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item name={'source'} label='Source extract sample'>
                        <Input.TextArea />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item name={'target'} label='Target extract sample'>
                        <Input.TextArea />
                     </Form.Item>
                  </Col>
                  <Col span={24}>
                     <Form.Item name={'image'} label='URL of an image to attach to a project'>
                        <Input />
                     </Form.Item>
                  </Col>
               </Row>
            </Form>
         </Modal>
      </Space>
   )
}

ProfileProjects.propTypes = {
   data: PropTypes.array,
   setData: PropTypes.func,
   profile: PropTypes.object
}

export default ProfileProjects
