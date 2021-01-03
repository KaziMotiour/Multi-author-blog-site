import React,{useState} from 'react'
import {FETCH_DATA, ERROR, RETRIVE_DATA} from '../actions/Action_types'

const initialState =({
    post: [],
    loading:false,
    error:null,
    singelPost:null

})

const getUserPost = (state, action) =>({
    ...state,
    post:action.data

})

const HandleError = (state, action) =>({
    ...state,
    error:action.data

})

const getRetriveData = (state, action) =>({
    ...state,
    singelPost:action.data

})






const CrudReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_DATA: return getUserPost(state, action)
        case ERROR : return HandleError(state, action)
        case RETRIVE_DATA : return getRetriveData(state, action)
        default: return state
    }
}

export default CrudReducer;