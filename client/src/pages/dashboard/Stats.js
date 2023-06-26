import React from 'react'
import {  useEffect } from 'react'
import { useAppContext } from '../../context/appContext.js'
import  StatsContainer  from '../../components/StatsContainer.js'
import  ChartsContainer  from '../../components/ChartsContainer.js'
import  Loading  from '../../components/Loading.js'


export default function Stats() {
 
  const { showStats, isLoading, monthlyApplications } = useAppContext()

  useEffect(()=>{
      showStats()
  },[])

  if(isLoading){
    return <Loading center />
  }
 
 
  return (
    <>
    
     <StatsContainer/>

       { monthlyApplications.length > 0 && <ChartsContainer/>}

       {/* <ChartsContainer/> */}






    </>
  )
}
