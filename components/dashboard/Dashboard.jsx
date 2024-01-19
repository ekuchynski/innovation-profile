import React from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Row, Typography } from 'antd'
import DashboardCV from './DashboardCV'
import DashboardProjectCreator from './DashboardProjectCreator'
import DashboardLanguages from './DashboardLanguages'
import DashboardDomains from './DashboardDomains'
import DashboardChart from './DashboardChart'
import DashboardProjects from './DashboardProjects'
import DashboardLinks from './DashboardLinks'

function Dashboard({ profile })
{
   return (
      <Row gutter={[10, 10]}>
         <DashboardLinks />
         <DashboardCV profile={profile} />
         <DashboardLanguages profile={profile} />
         <DashboardDomains />
         <DashboardProjectCreator profile={profile} />
         <DashboardChart />
         <DashboardProjects profile={profile} />
      </Row>
   )
}

Dashboard.propTypes = {
   profile: PropTypes.object
}

export default Dashboard
