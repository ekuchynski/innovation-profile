import React from 'react'
import { Card, Col, Collapse, Space, Typography } from 'antd'
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

function DashboardChart({ profile })
{
   const chartData = [{ name: 'Translation volumes', data: [690000, 544000, 720000, 670000, 930000, 1400000, 390000] }];
   const cats = ['2018', '2019', '2020', '2021', '2022', '2023', '2024 so far']

   return <Col xs={24} md={12}>
      <Card title='Work volumes chart'>
         <Typography>Here is our live chart showing amount of processed words during last years</Typography>
         <ReactApexChart type='bar' height={400} options={{
            chart: {
               height: '380px',
               type: 'bar',
               stacked: false,
               width: '300px'

            },
            grid: {
               row: {
                  colors: ['#f3f3f3', 'transparent'],
                  opacity: 0.5
               },
            },
            xaxis: {
               type: 'category',
               categories: cats
            },
            yaxis: {
               decimalsInFloat: 2
            },
            dataLabels: {
               enabled: true,
               distributed: true,
               dropShadow: true,
               formatter: (val, opts) =>
               {
                  if (val)
                     return Math.round(val * 100) / 100;
                  return val;
               }, background: {
                  enabled: 'true',
                  background: '#8F8F8F',
                  foreColor: 'black'
               }
            },
            markers: {
               size: 1, colors: 'black'
            },
            legend: {
               position: 'bottom',
               horizontalAlign: 'right',
               floating: false,
               offsetY: 20,
               offsetX: 0,
               height: 40,
               showForSingleSeries: true,
               onItemHover: {
                  highlightDataSeries: true
               }
            }
         }} series={chartData} />
      </Card>
   </Col>
}

export default DashboardChart
