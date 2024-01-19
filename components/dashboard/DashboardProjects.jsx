import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Col, Collapse, Image, Modal, Row, Space, Spin, Typography } from 'antd'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router';

function DashboardProjects(props)
{
   const supabase = useSupabaseClient();
   const router = useRouter();
   const [projects, setProjects] = useState();
   const [loading, setLoading] = useState(false);
   const [sampleOpen, setSampleOpen] = useState(false);
   const [selectedProject, setSelectedProject] = useState(false);

   useEffect(() =>
   {
      loadData()
   }, [router.isReady]);

   async function loadData()
   {
      setLoading(true);
      const { data } = await supabase.from('project').select('*');
      setLoading(false);
      setProjects(data);
   }

   return (<Col xs={24} md={12}>
      <Card title='Main projects'>
         <Typography>Highlighted projects we worked on. Click on the porject to see detailed descriptions and translation samples</Typography>
         <Spin spinning={loading}>
            <Collapse accordion={true}>
               {projects && projects.map(project => (<Collapse.Panel
                  key={project.id}
                  header={project.name}
               >
                  <Row gutter={[20, 10]}>
                     <Col span={10}>
                        <Image src={project.image_url} alt='Image' />
                     </Col>
                     <Col span={14}>
                        <Space direction='vertical'>
                           <Typography.Text type='secondary'>
                              Description: {project.description}
                           </Typography.Text>
                           <Typography.Text>
                              Languages: {project.languages}
                           </Typography.Text>
                           <Typography.Text>
                              Volume: {project.volume} words
                           </Typography.Text>
                           {project.extract1_target && <Button type='primary'
                              onClick={() => { setSelectedProject(project); setSampleOpen(true) }}>
                              View translation sample</Button>}
                        </Space>
                     </Col>
                  </Row>
               </Collapse.Panel>))}
            </Collapse>
         </Spin>

      </Card>
      <Modal title='Project translation sample'
         width={'80%'}
         open={sampleOpen}
         onCancel={() => setSampleOpen(false)}
         onOk={() => setSampleOpen(false)}
      >
         <Row gutter={[20, 10]}>
            <Col span={12}>
               <div style={{ background: 'whitesmoke', padding: '20px', border: '1px solid lightgrey', borderRadius: '3px' }}>
                  <h3>Source</h3>
                  {selectedProject.extract1_source}
               </div>
            </Col>
            <Col span={12}>
               <div style={{ background: 'whitesmoke', padding: '20px', border: '1px solid lightgrey', borderRadius: '3px' }}>
                  <h3>Target</h3>
                  {selectedProject.extract1_target}
               </div>
            </Col>
         </Row>
      </Modal>
   </Col>)
}

DashboardProjects.propTypes = {}

export default DashboardProjects
