import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function AreaChartComponent({data}) {
  return (
  
    <ResponsiveContainer width="100%" height={300}>

     <AreaChart data={data} margin={{top: 50}}>

     <CartesianGrid strokeDasharray='3 3' />

     <XAxis dataKey = 'date'/>
     <YAxis allowDecimals={false}/>
     <Tooltip/>
     <Area dataKey='count' fill='#2cb1bc' barSize={75}/>

     </AreaChart>


    </ResponsiveContainer>



  )
}
