import React from 'react'
import BarChartComponent from './BarChart.js'
import AreaChart from './AreaChart.js'
import Wrapper from '../assets/wrappers/ChartsContainer.js'
import { useAppContext } from '../context/appContext'
import { useState } from 'react'


export default function ChartsContainer() {
  const {monthlyApplications: data} = useAppContext()
  const [barChart, setBarChart] = useState(true)
  
  return (

  <Wrapper>

    <h4>Monthly Applications</h4>

    <button type='button' onClick={()=>{setBarChart(!barChart)}}> {(barChart) ? `Click here to visualise on Area Chart`: `Click here to visualise on Bar Chart`}  </button>

    {barChart ? <BarChartComponent data={data}/> : <AreaChart data={data}/>}

  

  </Wrapper>
 
  )
}
