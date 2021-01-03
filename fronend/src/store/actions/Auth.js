import React from 'react'
import axios from 'axios'
import {AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT,ERROR, AUTH_FAIL, AUTH_REGISTRATION} from './Action_types'


export const auth_start = () =>({
    
        type:AUTH_START
    
})

export const auth_success = (token) =>({
    
        type:AUTH_SUCCESS,
        access:token.access,
        refresh:token.refresh
        
    
})

export const auth_logout = () =>(
    localStorage.removeItem('access_token'),
    localStorage.removeItem('refresh_token'),
    {
        type:AUTH_LOGOUT
    }
)
export const auth_fail = (error) =>({
    
        type:AUTH_FAIL,
        error:ERROR
    
})

export const UserLogin = (email, password) => async dispatch =>{
    
    try{
        dispatch(auth_start())
        await axios.post('http://127.0.0.1:8000/api/token/',{email, password}).then(res =>{

            localStorage.setItem('access_token', res.data.access)
            localStorage.setItem('refresh_token', res.data.refresh)
            dispatch(auth_success(res.data))
        })
    }catch(error){
        
        dispatch(auth_fail(error))
    }
}

export const UserRegistration = (email,user_name,password) => async dispatch =>{
    console.log(email,user_name,password)
    try{
        dispatch(auth_start())
        await axios.post('http://127.0.0.1:8000/api/user/register/',{email,user_name,password}).then(res =>{

            dispatch({
                type:AUTH_REGISTRATION
            })
            
        })
    }catch(error){
        
        dispatch(auth_fail(error))
    }
}



