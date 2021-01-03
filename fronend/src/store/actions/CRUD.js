import React from 'react'
import axios from 'axios'
import {FETCH_DATA, ERROR, RETRIVE_DATA} from './Action_types'

export const FetchData = () => async dispatch =>{
    try{
        const post = await axios.get('http://127.0.0.1:8000/api/')
        dispatch({
            type:FETCH_DATA,
            data : post.data
        })
    }catch(error){
      
        dispatch({
            type:ERROR,
            error:error
        })

    }
}

export const RetriveData = (id) => async dispatch =>{
    try{
        const singlepost = await axios.get(`http://127.0.0.1:8000/api/${id}`)
        dispatch({
            type:RETRIVE_DATA,
            data : singlepost.data
        })
    }catch(error){
      
        dispatch({
            type:ERROR,
            error:error
        })

    }
}

export const CreateData = (data, config) => async dispatch =>{

    try{
        await axios.post('http://127.0.0.1:8000/api/admin/create/', data, config)
        await new Promise((resolve) => setTimeout(() => { 
            
            dispatch(FetchData())
          
        }, 2000))
        

    }catch(error){
        dispatch({
            type:ERROR,
            error:error
        })

    }

}


export const UpdateData = (data, config, id) => async dispatch =>{

    try{
        await axios.put(`http://127.0.0.1:8000/api/admin/detail/${id}`, data, config,id )
        await new Promise((resolve) => setTimeout(() => { 
            
            dispatch(FetchData())
          
        }, 2000))
        

    }catch(error){
        dispatch({
            type:ERROR,
            error:error
        })

    }

}


export const DeleteData = (id) => async dispatch =>{

    try{
        await axios.delete(`http://127.0.0.1:8000/api/admin/detail/${id}`)
        await new Promise((resolve) => setTimeout(() => { 
            
            dispatch(FetchData())
          
        }, 2000))
        

    }catch(error){
        dispatch({
            type:ERROR,
            error:error
        })

    }

}


