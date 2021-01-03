import React, {useState} from 'react'
import {AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT, AUTH_FAIL, AUTH_REGISTRATION} from '../actions/Action_types'


const initialState =({
    access_token:localStorage.getItem('access_token'),
    refresh_token:localStorage.getItem('refresh_token'),
    loading: false,
    error:null,
    registration:false
})

const authStart = (state, action) =>({
    ...state,
    loading:true
})

const authSucces = (state, action) =>({
    ...state,
    access_token: action.acess,
    refresh_token: action.refresh,
    loading:false

})

const authFailed = (state, action) =>({
    ...state,
    error:action.error,
    loading:false

})
const authLogout = (state, action) =>({
    ...state,
    access_token:null,
    refresh_token:null
})
const authRegistration = (state, action) =>({
    ...state,
    registration:true
})


const AuthReducer = (state=initialState, action) =>{
    switch(action.type){
        case AUTH_START: return authStart(state, action)
        case AUTH_SUCCESS: return authSucces(state, action)
        case AUTH_FAIL: return authFailed(state, action)
        case AUTH_REGISTRATION: return authRegistration(state, action)
        case AUTH_LOGOUT: return authLogout(state, action)
        default: return state
    }
}

export default AuthReducer;