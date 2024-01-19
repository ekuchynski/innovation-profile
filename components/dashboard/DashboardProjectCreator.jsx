import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Card, Col, Form, Input, Select, Space, Spin, Tooltip, Typography, Upload, message } from 'antd'
import { v4 } from 'uuid';
import { GetToken, showApiError } from '@/utils/constants';

function DashboardProjectCreator(props)
{
   const [loading, setLoading] = useState(false);
   const [uploadedFiles, setUploadedFiles] = useState([]);
   const [selectedTemplateId, setSelectedTemplateId] = useState();
   const [options, setOptions] = useState([]);
   const [loadingMessage, setLoadingMessage] = useState('');
   const [amount, setAmount] = useState('');
   const [form] = Form.useForm();

   useEffect(() =>
   {
      setOptions(props.profile.project_template.map(temp =>
      {
         return {
            value: temp.templateId,
            label: temp.name,
            languages: temp.languages,
            description: temp.description
         }
      }))
   }, [props.profile])

   async function onUploadChange(info)
   {
      if (info.status === 'error')
      {
         message.error(`Error when uploading file ${info.file.name}.`);
      }

      const anyUploading = info.fileList.find(x => x.status === 'uploading');
      if (anyUploading)
      {
         setLoading(true);
      }
      else
      {
         setLoading(false);
      }

      if (info.file.status === 'done')
      {
         const id = v4();

         setUploadedFiles(old => [...old, {
            name: info.file.name,
            file: info.file.originFileObj,
            id: id
         }]);
      }
   }

   function onSelectTemplate(e)
   {
      setSelectedTemplateId(e);
   }

   async function createProject()
   {
      setAmount(null);
      const token = await GetToken();
      const values = form.getFieldsValue();

      setLoading(true);
      setLoadingMessage("Please wait while we're creating and calculating the project");

      const res1 = await fetch('/api/project/empty', {
         method: 'POST',
         body: JSON.stringify({
            name: 'New demo project from customer ' + values.name,
            templateId: selectedTemplateId,
            token: token
         })
      })
      if (!res1.ok)
      {
         await showApiError(res1);
         setLoading(false);
         return;
      }
      const responseProject = await res1.json();
      localStorage.setItem('projectId', responseProject.id)

      // upload files
      setLoadingMessage("Uploading your files...");

      for (let index = 0; index < uploadedFiles.length; index++)
      {
         const x = uploadedFiles[index];

         var data = new FormData();
         data.append('file', x.file);
         data.append('projectId', responseProject.id);
         data.append('token', token);

         const res2 = await fetch('/api/project/files', {
            method: 'POST',
            body: data
         })
         if (!res2.ok)
         {
            await showApiError(res2);
            setLoading(false);
            return;
         }
      }

      setLoadingMessage('Starting the project');

      console.log('Starting the project')
      try
      {
         const res3 = await fetch(`/api/project/start`, {
            method: 'POST',
            body: JSON.stringify({
               projectId: responseProject.id,
               token: token
            })
         });
         if (!res3.ok)
         {
            await showApiError(res2);
            setLoading(false);
            return;
         }
      }
      catch (e)
      {
         setLoading(false);
      }

      // Wait for the quote
      setLoadingMessage('Waiting for the project anmount calculation...')

      setLoading(false);

      await checkProject();
   }

   async function checkProject()
   {
      setAmount(null);
      setLoading(true);
      setLoading('Retrieving project price...')
      const token = await GetToken();
      const projectId = localStorage.getItem('projectId');
      const res = await fetch(`/api/project/check?projectId=${projectId}&token=${token}`)
      if (!res.ok)
      {
         await showApiError(res);
         setLoading(false);
         return;
      }
      const data = await res.json();
      if (!data?.quote)
      {
         setTimeout(() =>
         {
            checkProject();
         }, 3000);
      }
      else
      {
         setAmount(data.quote.totalAmount + ' ' + data.quote.currencyCode);
         setLoading(false);
      }
   }

   return (
      <Col span={24}>
         <Card title='Estimate your project!'>
            <Spin spinning={loading} tip={loadingMessage}>
               <Space direction='vertical' style={{ width: '100%' }}>
                  <Typography>
                     Here you can upload one or more files and get quotation for your project.
                  </Typography>
                  <Upload.Dragger
                     action='/api/uploadFile'
                     multiple={true}
                     showUploadList={true}
                     onChange={onUploadChange}
                     style={{ width: '100%' }}
                     width='500px'
                  >
                     <div style={{ marginBottom: '20px', width: '100%' }}>
                        <i className="fa-solid fa-square-plus"></i>
                        <div>
                           Drag and drop files here
                        </div>

                     </div>
                  </Upload.Dragger>
                  {uploadedFiles?.length > 0 && <Space direction='vertical'>
                     <Typography>Please select one of templates</Typography>
                     <Select style={{ minWidth: '300px' }}
                        onChange={onSelectTemplate}
                        options={options}
                        value={selectedTemplateId}
                        optionRender={(e) =>
                        {
                           const temp = e.data;
                           return (<div>
                              <Typography>
                                 {temp.label}
                              </Typography>
                              <Typography.Text type='secondary'>
                                 {temp.languages}
                              </Typography.Text>
                              <br />
                              <Typography.Text type='secondary'>
                                 {temp.description}
                              </Typography.Text>
                           </div>)
                        }}
                     />
                     <Form name='form_project' form={form} layout='vertical'>
                        <Form.Item label='Please provide your name' name={'name'}>
                           <Input />
                        </Form.Item>
                     </Form>

                  </Space>}
                  <Space>
                     <Button type='primary' disabled={!selectedTemplateId}
                        onClick={createProject}
                     >
                        Create project!
                     </Button>
                     <Tooltip title='If you created a project and then refreshed this page, you can click this button to retrieve pricing information about the project you have previously created'>
                        <Button onClick={checkProject}>
                           Re-check latest created project
                        </Button>
                     </Tooltip>
                  </Space>
                  {amount && <Card title='Project calculation results'>
                     <Alert type='error' message={<Space direction='vertical'>
                        <Typography.Title level={2}>
                           Your project price is {amount}
                        </Typography.Title>
                        <Typography.Link>Contact us to start the project</Typography.Link>
                     </Space>}>

                     </Alert>
                  </Card>}
               </Space>
            </Spin>
         </Card>
      </Col>)
}

DashboardProjectCreator.propTypes = {}

export default DashboardProjectCreator
