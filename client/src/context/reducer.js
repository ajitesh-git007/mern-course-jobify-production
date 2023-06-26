import { DISPLAY_ALERT, HANDLE_CHANGE, CLEAR_VALUES } from './actions.js'
import { CLEAR_ALERT } from './actions.js'
import { REGISTER_USER_BEGIN } from './actions.js'
import { REGISTER_USER_SUCCESS } from './actions.js'
import { REGISTER_USER_ERROR } from './actions.js'

import { LOGIN_USER_BEGIN } from './actions.js'
import { LOGIN_USER_SUCCESS } from './actions.js'
import { LOGIN_USER_ERROR } from './actions.js'

import { UPDATE_USER_BEGIN } from './actions.js'
import { UPDATE_USER_SUCCESS } from './actions.js'
import { UPDATE_USER_ERROR } from './actions.js'

import { CREATE_JOB_BEGIN } from './actions.js'
import { CREATE_JOB_SUCCESS } from './actions.js'
import { CREATE_JOB_ERROR } from './actions.js'

import { TOGGLE_SIDEBAR } from './actions.js'

import { LOGOUT_USER } from './actions.js'

import { GET_JOBS_BEGIN } from './actions.js'
import { GET_JOBS_SUCCESS } from './actions.js'

import { SET_EDIT_JOB } from './actions.js'

import { DELETE_JOB_BEGIN } from './actions.js'

import { EDIT_JOB_BEGIN } from './actions.js'
import { EDIT_JOB_SUCCESS } from './actions.js'
import { EDIT_JOB_ERROR } from './actions.js'

import { SHOW_STATS_BEGIN } from './actions.js'
import { SHOW_STATS_SUCCESS } from './actions.js'



const reducer = (state, action) =>{
    
    if(action.type === LOGOUT_USER){
        return {...state, user: null, location: null, token: null, jobLocation: null}
    }

    if(action.type === TOGGLE_SIDEBAR){
        return {...state, showSidebar: (state.showSidebar) ? false : true}
    }

    
    if(action.type === DISPLAY_ALERT){
        return {...state, showAlert: true, alertType: 'danger', alertText: 'Please provide all values !'}

    }

    if(action.type === CLEAR_ALERT){
        return {...state, showAlert: false, alertType: '', alertText: ''}

    }

    if(action.type === REGISTER_USER_BEGIN){
        return {...state, isLoading: true }
    }

    if(action.type === REGISTER_USER_SUCCESS){
        return {...state, isLoading: false, token: action.payload.token, user: action.payload.user, userLocation: action.payload.location, jobLocation: action.payload.location, showAlert:true, alertType:'success', alertText:'User Created! Redirecting...'}
    }

    if(action.type === REGISTER_USER_ERROR){
        return{...state, isLoading: false, showAlert:true, alertType:'danger', alertText: action.payload.msg}
    }

    if(action.type === LOGIN_USER_BEGIN){
            return{...state, isLoading: true}
    }

    if(action.type === LOGIN_USER_SUCCESS){
        return {...state, isLoading: false, showAlert: true, alertType:'success', alertText:'Verified! Redirecting...', token: action.payload.token, user: action.payload.user, userLocation: action.payload.location, jobLocation: action.payload.location}
    }

    if(action.type === LOGIN_USER_ERROR){
        return {...state, isLoading: false, showAlert:true, alertType:'danger', alertText: 'Invalid Credentials'}
    }

    if(action.type === UPDATE_USER_BEGIN){
        return{...state, isLoading: true}
}

    if(action.type === UPDATE_USER_SUCCESS){
    return {...state, isLoading: false, showAlert: true, alertType:'success', alertText:'updated!', token: action.payload.token, user: action.payload.user, userLocation: action.payload.location, jobLocation: action.payload.location}
    }

    if(action.type === UPDATE_USER_ERROR){
        return {...state, isLoading: false, showAlert:true, alertType:'danger', alertText: 'Invalid Credentials'}
    }

    if(action.type === HANDLE_CHANGE){
        return {...state, [action.payload.name] : action.payload.value }
    }

    if(action.type === CLEAR_VALUES){

        const initialState = {
            
            isEditing: false,
            editJobId: '',
            position: '',
            company: '', 
            
            jobType: 'full-time',
            
            status: 'pending',
            jobLocation: state.userLocation
            
        }


        return {...state, ...initialState }
    }


    if(action.type === CREATE_JOB_BEGIN){
        return {...state, isLoading: true }
    }

    if(action.type === CREATE_JOB_SUCCESS){
        return{...state, isLoading: false, showAlert:true, alertType:'success', alertText: 'New Job Created!'}    }

    if(action.type === CREATE_JOB_ERROR){
        return{...state, isLoading: false, showAlert:true, alertType:'danger', alertText: action.payload.msg}
    }

    if(action.type === GET_JOBS_BEGIN){
        return {...state, isLoading: true, showAlert: false } // FOR ACTIVATING THAT FUCKING SPINNER
    }

    if(action.type === GET_JOBS_SUCCESS){
         return {...state, isLoading: false, jobs: action.payload.jobs, totalJobs: action.payload.totalJobs, numOfPages: action.payload.numOfPages}
    }

    if(action.type === SET_EDIT_JOB){
        // const job = state.jobs.find((job) => job._id === action.payload.id);
        // const { _id, position, company, jobLocation, jobType, status } = job;
        return {...state, isLoading: false, company: action.payload.company, position: action.payload.position, jobType: action.payload.jobType, status: action.payload.status, jobLocation: action.payload.jobLocation, isEditing: true, editJobId: action.payload.id}
   }


   if(action.type === DELETE_JOB_BEGIN){
    return {...state, isLoading: true}
   }

   if(action.type === EDIT_JOB_BEGIN){
    return {...state, isLoading: true }
    }

    if(action.type === EDIT_JOB_SUCCESS){
        return{...state, isLoading: false, showAlert:true, alertType:'success', alertText: 'Job Updated!'}
    }

    if(action.type === EDIT_JOB_ERROR){
        return{...state, isLoading: false, showAlert:true, alertType:'danger', alertText: action.payload.msg}
    }

    if(action.type === SHOW_STATS_BEGIN){
        return {...state, isLoading: true, showAlert:false }
    }
    
    if(action.type === SHOW_STATS_SUCCESS){
            return{...state, isLoading: false, stats: action.payload.stats, monthlyApplications: action.payload.monthlyApplications}
    }


        throw new Error(`no such action : ${action.type}`)
    }

export default reducer
