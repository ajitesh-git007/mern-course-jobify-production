import React from "react";
import { useContext, useState, useReducer, useEffect } from "react";
import reducer from './reducer.js'
import { DISPLAY_ALERT , CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, HANDLE_CHANGE, CLEAR_VALUES, CREATE_JOB_BEGIN, CREATE_JOB_ERROR, CREATE_JOB_SUCCESS, GET_JOBS_BEGIN, GET_JOBS_SUCCESS, SET_EDIT_JOB, DELETE_JOB_BEGIN, EDIT_JOB_BEGIN, EDIT_JOB_SUCCESS, EDIT_JOB_ERROR, SHOW_STATS_BEGIN, SHOW_STATS_SUCCESS} from "./actions.js";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import { getAllJobs } from "../../../controllers/jobsController.js";


const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
// const parsedUser = user ? JSON.parse(user) : null;
const userLocation = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    showSidebar: false,
    alertType: '',
    user: (user === null) ? null : JSON.parse(user), // this line is making trouble
    token: token,
    userLocation: (userLocation) ? userLocation : '',
    isEditing: false,
    editJobId: '',
    position: '',
    company: '', 
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    jobLocation: '',
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    
}
console.log(user)

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)


    // axios.defaults.headers['Authorization'] = `Bearer ${state.token}` // --> there is problem in this one also, if we send request to anyone of this, it will just randomly distribute tokens here and there

    const authFetch = axios.create({ // it is still inefficient to catch that 401 --> authentication errors, therefore we will use interceptors, that is why customize kr diya broo
        baseURL: '/api/v1',
        headers: {   // jin request ka base URL ye h bss ussi m headers ko include kr do baaki aur kisi requests mei headers add nhi hone chiye
            Authorization: `Bearer ${state.token}`,
        },
    })

    authFetch.interceptors.request.use((config)=>{
        // config.headers['Authorization'] = `Bearer ${state.token}`
        return config
    }, (error)=>{
  
         return Promise.reject(error)

    })

    authFetch.interceptors.response.use((response)=>{
        // config.headers['Authorization'] = `Bearer ${state.token}`
        return response
    }, (error)=>{
         
         console.log(error.response)

         if(error.response.status === 401){
            console.log(`AUTH ERROR`)
            removeUserFromLocalStorage()
         }

         return Promise.reject(error)

    })


    const displayAlert = () =>{
         dispatch({type : DISPLAY_ALERT})
           clearAlert();
    }

    const clearAlert = () =>{
        setTimeout(()=>{
            dispatch({type : CLEAR_ALERT})
        }, 3000)

       
   }

   const addUserToLocalStorage = ({user, token, location}) => {
       localStorage.setItem('user', JSON.stringify(user))
       localStorage.setItem('token', token)
       localStorage.setItem('location', location)
   }
   

   const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
}

     const registerUser = async (currentUser) => {
        // console.log(currentUser)
        dispatch({type: REGISTER_USER_BEGIN})

        try{
            const response = await axios.post('/api/v1/auth/register', currentUser)
            // console.log(response)

            const {user, token, location} = response.data
            dispatch({
                type: REGISTER_USER_SUCCESS, 
                payload: {user, token, location}
            })
           addUserToLocalStorage({token, user, location})

          
        }
        catch(error){
            console.log(error.response)
            dispatch({type: REGISTER_USER_ERROR, payload: {msg: error.response.data.msg}})
        }

        clearAlert();   
     }

     const loginUser = async(currentUser) => {
        console.log(currentUser)  
        
        dispatch({type: LOGIN_USER_BEGIN})
            
          

           try{

            const response = await axios.post('/api/v1/auth/login', currentUser)
            // console.log(response)

            const {user, token, location} = response.data
            dispatch({
                type: LOGIN_USER_SUCCESS, 
                payload: {user, token, location},
            })
           addUserToLocalStorage({user, token, location})

           

            
           }
           catch(error){
            console.log(error.response)
            dispatch({type: LOGIN_USER_ERROR})
           }

           clearAlert();


     }

//      const navigate = useNavigate()

//      useEffect(()=>{
//         if(user){
//          setTimeout(()=>{
//              navigate('/')
//          }, 3000)
//         }
//    }, [user, navigate])

const toggleSidebar = () => {
    dispatch({type: TOGGLE_SIDEBAR})
    console.log(`i am working`)
}

const logoutUser = () => {
    dispatch({type : LOGOUT_USER})
    removeUserFromLocalStorage()
}

const handleChange = ({name, value}) => {
    dispatch({type: HANDLE_CHANGE, payload: {name, value}})
}

const clearValues = () => {
    // e.preventDefault()
    dispatch({type: CLEAR_VALUES})
}




const createJob = async() => {
    dispatch({type: CREATE_JOB_BEGIN})

    try{


    const { company, position, jobLocation, jobType, status } = state

    await authFetch.post('/jobs', {

    position, 
    company,
    jobLocation,
    jobType, 
    status,

    })

    dispatch({type: CREATE_JOB_SUCCESS})

    dispatch({type: CLEAR_VALUES})

    clearAlert(); 
    }
    catch(error){

        if(error.response.status === 401) return

        dispatch({type: CREATE_JOB_ERROR, payload: {msg: 'Error in creating this job post'}})

        clearAlert(); 

    }



}





const updateUser = async (currentUser) => {  
    
    dispatch({type: UPDATE_USER_BEGIN})

    try {
        const { data } = await authFetch.patch(
          "/auth/updateUser",
          currentUser
        //   {
        //     headers: {
        //       Authorization: `Bearer ${state.token}`,
        //     }
        //   }
        )

        const {user, location, token} = data

        dispatch({type: UPDATE_USER_SUCCESS, payload: {user, location, token}})
        addUserToLocalStorage({ user, location, token})
        // console.log(data)
      } 
      catch (error) {
        console.log(error.response);

        if(error.response.status !== 401)
        {dispatch({type: UPDATE_USER_ERROR, payload:{msg: error.response.data.msg}})
        clearAlert()}
      }



    // console.log(currentUser)
}



    const getJobs = async() =>{
        let url = '/jobs'

        dispatch({type: GET_JOBS_BEGIN})


       try{


       const { data } = await authFetch.get(url)

       const {jobs, totalJobs, numOfPages } = data

       dispatch({type: GET_JOBS_SUCCESS, payload: {jobs, totalJobs, numOfPages}})


       }
       catch(error){
        console.log(error.response)
        logoutUser()
       }

       clearAlert()


    }


    

    const editJob = async(req, res) => {
        dispatch({type: EDIT_JOB_BEGIN})

        try{

            // const job = await Job.findOne({ _id: jobId });

            const { company, position, jobLocation, jobType, status} = state

            // if(!company || !position || !jobLocation){
            //     displayAlert()
            //     clearAlert()
            // }

            // const { id: jobId } = req.params

            // console.log(jobId)

            //  console.log(state.editJobId)

            
            await authFetch.patch(`/jobs/${state.editJobId}`, { company, position, jobLocation, jobType, status})

            dispatch({type: EDIT_JOB_SUCCESS})

            dispatch({type: CLEAR_VALUES})

        }
        catch(error){
 
           if(error.response.status === 401) return

           dispatch({type: EDIT_JOB_ERROR, payload: {msg: error.response.data.msg}})


        }

        clearAlert()
    }

    const setEditJob = (id) =>{
        const job = state.jobs.find(job => job._id === id)

        const { company, position, jobType, status, jobLocation} = job



        dispatch({type: SET_EDIT_JOB, payload: {company, position, jobType, status, jobLocation, id}})

        // editJob(id)

    }

    const setDeleteJob = async(id) =>{
         dispatch({type: DELETE_JOB_BEGIN})

         try{
           await authFetch.delete(`./jobs/${id}`)
           getJobs()
         }
         catch(error){
            console.log(error.response)
            logoutUser()
         }

    }

    const showStats = async() => {
        dispatch({type: SHOW_STATS_BEGIN})


        try{

            const {data} = await authFetch.get('/jobs/stats')

            dispatch({
                type: SHOW_STATS_SUCCESS,
                payload: {stats: data.defaultStats, monthlyApplications: data.monthlyApplications }
            })

        }
        catch(error){
            console.log(error)
            logoutUser()
        }

        clearAlert()
    }


    return <AppContext.Provider value ={{...state, displayAlert, clearAlert, registerUser, loginUser, toggleSidebar, logoutUser, updateUser, handleChange, clearValues, createJob, getJobs, setEditJob, setDeleteJob, editJob, showStats}} > {children} </AppContext.Provider>

}

const useAppContext = () =>{
    return useContext(AppContext)
}

export {AppProvider, initialState, useAppContext}