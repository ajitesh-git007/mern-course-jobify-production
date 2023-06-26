import React from 'react'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function BarChartComponent({data}) {
  return (


    <ResponsiveContainer width="100%" height={300}>

     <BarChart data={data} margin={{top: 50}}>

     <CartesianGrid strokeDasharray='1 1' />

     <XAxis dataKey = 'date'/>
     <YAxis allowDecimals={false}/>
     <Tooltip/>  {/*The component provides a tooltip that displays additional information when hovering over the chart bars.*/}
     <Bar dataKey='count' fill='#2cb1bc' barSize={75}/>

     </BarChart>


    </ResponsiveContainer>
  )
}
