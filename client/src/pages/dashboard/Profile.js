import React from 'react'
import { useState } from 'react'
import  Alert  from '../../components/Alert.js'
import  FormRow  from '../../components/FormRow.js'
import { useAppContext } from '../../context/appContext.js'
import Wrapper from '../../assets/wrappers/DashboardFormPage'


export default function Profile() {
  
  const { user, showAlert, isLoading, displayAlert, updateUser } = useAppContext()

  const [name, setName] = useState(user?.name);
const [email, setEmail] = useState(user?.email);
const [lastName, setLastName] = useState(user?.lastName);
const [location, setLocation] = useState(user?.location);


  const handleSubmit = (e) => {
    e.preventDefault()

    if(!name || !email || !lastName || !location){

       displayAlert()
       return

    }

    updateUser({name, email, lastName, location})

    // console.log('update User')
  }
  
  return (

    <>
    
    <Wrapper>

     <form className = "form" onSubmit = {handleSubmit}> 

      <h3>Profile</h3>

      {showAlert && <Alert/>}

      <div className="form-center">

      <FormRow type='text' name='name' value={name} handleChange={(e) => setName(e.target.value)}/>

      <FormRow type='email' name='email' value={email} handleChange={(e) => setEmail(e.target.value)}/>


      <FormRow type='text' name='lastName' labelText = 'last name' value={lastName} handleChange={(e) => setLastName(e.target.value)}/>


      <FormRow type='text' name='location' value={location} handleChange={(e) => setLocation(e.target.value)}/>
 
      <button className="btn btn-block" type='submit' disabled={isLoading} > {(isLoading) ? 'Please wait...' : 'Save changes'}   </button>
      
       


      </div>



     </form>



    </Wrapper>









    </>
  )
}
