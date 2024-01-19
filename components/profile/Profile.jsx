import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Card, Checkbox, Col, Form, Modal, Row, Space, Spin, Tabs, Typography, notification } from 'antd'
import EditorHtml from '../editors/EditorHtml';
import EditorCheckbox from '../editors/EditorCheckbox';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { v4 } from 'uuid';
import ProfileLanguages from './ProfileLanguages';
import ProfileProjects from './ProfileProjects';

function Profile(props)
{
   const [form] = Form.useForm();
   const supabase = useSupabaseClient();
   const [errorText, setErrorText] = useState();
   const [loading, setLoading] = useState(false);
   const [profile, setProfile] = useState();
   const [projects, setProjects] = useState();
   const [domains, setDomains] = useState();
   const [templates, setTemplates] = useState();

   useEffect(() =>
   {
      loadProfile();
   }, [])

   async function loadProfile()
   {
      setLoading(true);
      setErrorText('');

      const tenantId = localStorage.getItem('tenant');
      if (!tenantId)
      {
         setErrorText('Please login first');
         return;
      }

      const { data, error } = await supabase.from('profile').select('*, project(*), domain(*), project_template(*)').eq('tenantId', tenantId).maybeSingle();
      setLoading(false);

      if (error)
      {
         setErrorText(error.message);
         return;
      }

      if (data)
      {
         setProjects(data.project);
         setDomains(data.domain);
         setTemplates(data.project_template);
         delete data.project;
         delete data.domain;
         delete data.project_template;
         setProfile(data);
         form.setFieldsValue(data);
      }
   }

   async function saveProfile()
   {
      setLoading(true);
      const tenantId = localStorage.getItem('tenant');
      const values = { ...profile, ...form.getFieldsValue() };
      if (!values.id)
      {
         values.id = v4();
         values.tenantId = tenantId;
      }

      const { error } = await supabase.from('profile').upsert(values);
      await supabase.from('project_template').upsert(templates);
      await supabase.from('project').upsert(projects);
      setLoading(false);
      if (error)
      {
         Modal.error({ content: 'Error while saving your profile. ' + error.message });
         return;
      }

      notification.success({ message: 'Your profile has been successfully saved' });
      await loadProfile();
   }

   return (<Spin spinning={loading}>
      {errorText && <Alert type='error' message={errorText} />}
      {!errorText && <Row gutter={[10, 10]}>
         <Col span={24}>
            <Typography.Title level={3}>
               Profile settings
            </Typography.Title>
         </Col>
         <Col span={24}>
            <Form form={form} layout='vertical'>
               <Col span={24}>
                  <Card style={{ width: '100%' }}>
                     <Tabs
                        style={{ width: '100%' }}
                        items={[
                           {
                              key: 'tab1',
                              label: <Space>
                                 <i className='fa-light fa-user' />
                                 <span>General settings</span>
                              </Space>,
                              children: <Row>
                                 <Col span={24}>
                                    <Form.Item label='Show recent projects' name='showRecent'>
                                       <EditorCheckbox />
                                    </Form.Item>
                                 </Col>
                                 <Col span={24}>
                                    <Form.Item label='Show highlighted projects' name='showProjects'>
                                       <EditorCheckbox />
                                    </Form.Item>
                                 </Col>
                              </Row>
                           },
                           {
                              key: 'tab2',
                              label: <Space>
                                 <i className='fa-light fa-memo-circle-info' />
                                 <span>CV presentation</span>
                              </Space>,
                              children: <Row>
                                 <Col span={24}>
                                    <Form.Item name='description' label='Your presentation/CV' extra='You can use provided editor to compose presentation of your company in a free form'>
                                       <EditorHtml />
                                    </Form.Item>
                                 </Col>
                              </Row>
                           },
                           {
                              key: 'tab3',
                              label: <Space>
                                 <i className='fa-light fa-briefcase' />
                                 <span>Highlight projects</span>
                              </Space>,
                              children: <Row>
                                 <ProfileProjects data={projects} setData={setProjects} profile={profile} />
                              </Row>
                           },
                           {
                              key: 'tab5',
                              label: <Space>
                                 <i className='fa-light fa-language' />
                                 <span>Project creation widget</span>
                              </Space>,
                              children: <Row gutter={[10, 10]}>
                                 <ProfileLanguages data={templates} setData={setTemplates} profile={profile} />
                              </Row>
                           },
                           {
                              key: 'tab4',
                              label: <Space>
                                 <i className='fa-light fa-books' />
                                 <span>Domains</span>
                              </Space>,
                              children: <Row>

                              </Row>
                           }
                        ]}
                     ></Tabs>
                  </Card>
               </Col>
            </Form>
         </Col>
         <Col span={24}>
            <Button danger onClick={saveProfile}>
               Save profile
            </Button>
         </Col>
      </Row>
      }
   </Spin>
   )
}

Profile.propTypes = {}

export default Profile
