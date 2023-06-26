import React from 'react'
import FormRow from '../../components/FormRow.js'
import Alert from '../../components/Alert.js'
import FormRowSelect from '../../components/FormRowSelect.js'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage.js'



export default function AddJob() {
   
   const { user } = useAppContext()

  const {
    showAlert, 
    displayAlert,
    position,
    company, 
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing, 
    handleChange,
    clearValues, 
    isLoading,
    createJob,
    editJob,

  } = useAppContext()

  
  

  const handleJobInput = (e) =>{
     
    const name = e.target.name
    const value = e.target.value

    handleChange({name, value})

    // e.target.name = e.target.value
    

    // console.log( `${name}: ${value}` )
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(!position || !company || !jobLocation){
      displayAlert()
      return
    }

    if(isEditing){
      editJob()
      return 
    }

    createJob()

    console.log('create job')
  }

  // jobLocation = user.location
  
  
  return (
    <>
    
    <Wrapper>

      <form  className="form">


      <h3>{isEditing ? 'edit job' : 'add job'}</h3>

      {showAlert && <Alert/>}

      <div className="form-center">

       {/* position */}
      <FormRow type='text' name='position' value={position} handleChange={handleJobInput}></FormRow>

      {/* company */}
      <FormRow type='text' name='company' value={company} handleChange={handleJobInput}></FormRow>

      {/* jobLocation */}
      <FormRow type='text' name='jobLocation' value={jobLocation} handleChange={handleJobInput} labelText={'job location'}></FormRow>
 
        {/* job type */}
        <FormRowSelect labelText={'job type'} name={'jobType'} value={jobType} handleChange={handleJobInput} list={jobTypeOptions} />

        {/* job status */}
        <FormRowSelect  labelText={'status'} name={'status'} value={status} handleChange={handleJobInput} list={statusOptions}/ >


        <div className="btn-container">

           <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit} disabled={isLoading}> Submit </button>
           <button  className='btn btn-block clear-btn' onClick={(e)=>{
                e.preventDefault()
                clearValues()
           }}> Clear </button>
        </div>

        {/* <div className="btn-container">

        <button  className='btn btn-block clear-btn' onClick={clearValues}> Clear </button>
        </div> */}


      </div>


      </form>






    </Wrapper>

    </>
    
  )
  

}
