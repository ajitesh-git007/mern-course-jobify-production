import React from 'react'
import { useState, useEffect } from 'react'
import { Logo } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import FormRow from '../components/FormRow'
import Alert from '../components/Alert'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
// import { initialState } from '../context/appContext.js'



const initialState = {
    name:'',
    email:'',
    password:'',
    isMember:true,
    showAlert: false,
}

export default function Register() {

    const navigate = useNavigate()
    const [values, setValues] = useState(initialState);

    const toggleMember = () =>{           {/*// YE WALA FUNCTION ISLIYE HAI KYU KI, TAAKI TOOGLE KR SKE BETWEEN REGISTER AND LOGIN,, AGR ISMEMBER == TRUE --> LOGIN , NHI TOH ISMEMBER == FALSE --> REGISTER*/}
        setValues({...values, isMember: !values.isMember})
    }
  

    const {user, isLoading, showAlert, displayAlert, clearAlert, registerUser, loginUser} = useAppContext()

    const handleChange = (e) => {
       
        setValues({...values, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
        if(user){
         setTimeout(()=>{
             navigate('/')
         }, 3000)
        }
   }, [user, navigate])

    const onSubmit = (e) => {
        e.preventDefault();
      
        let {name, email, password, isMember} = values

       if((!isMember && !name ) || !email || !password){
        
        displayAlert()
        return;
       }
       if(isMember){

       

         name = (user === null) ? null : user.name;
       }
       
       let currentUser = {name, email, password};

       if(isMember){
        console.log('already a member')
        loginUser(currentUser)
       }
       else{
        registerUser(currentUser)
       }

       
      
       
       
    }

   


    
    
    return (
   
       
        
   <>




   
   
   <Wrapper className='full-page'>

    

   <form className='form' onSubmit={onSubmit}>

    <Logo/>
    
    {(values.isMember) ? <h3>Login</h3> : <h3>Register</h3>}    {/*// CARD KI HEADING TOGGLE KRNE KE LIYE, YA TOH LOGIN YA FIRR REGISTER*/}
    

    {showAlert && <Alert/>}

    <FormRow type='email' name = 'email' value={values.value} handleChange = {handleChange} placeholder = 'username@gmail.com'/>

     {!(values.isMember) && <FormRow type='text' name = 'name' value={values.value} handleChange = {handleChange} />} {/*// EMAIL WALA SECTION TBHI DIKHEGA JBB LOGGED IN NHI HOGA, MTLB*/ }

    <FormRow type='password' name = 'password' value={values.value} handleChange = {handleChange} placeholder = 'qwertyu' />

   

    <button type='submit' className='btn btn-block' disabled = {isLoading}>submit</button>
        
     <button type='button' className='btn' disabled = {isLoading}> For Demo (email: Test@Gmail.com) style={{width: '100%'}}  </button>
        
        <button type='button' className='btn' disabled = {isLoading} style={{width: '100%'}}> For Demo (password: Jobify) </button>
    <p>
     {values.isMember ? 'Not a member yet !?' : 'Already a member !?'}      {/* // YE BUTTON KE NEECHE KA SAJO SAMAN BNANE KE LIYE*/}
     <button type='button' onClick={toggleMember} className='member-btn'>
     {values.isMember ? 'Register' : 'Login'}
     </button>

    </p>

   </form>


   </Wrapper>
   
   
   
   
   </>


    
  )
}

