import axios from "axios"
import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS } from "./action.type"

export const register = (payload) => dispatch =>{
    dispatch({type:REGISTER_REQUEST})
   return axios.post("https://masai-api-mocker.herokuapp.com/auth/register",payload)
   .then((r)=>{ dispatch({type:REGISTER_SUCCESS,payload:r.data})
    return REGISTER_SUCCESS
})
   .catch((e)=>{
    dispatch({type:REGISTER_ERROR})
    return REGISTER_ERROR
   })
}


export const login = (param) => dispatch =>{
    dispatch({type:LOGIN_REQUEST})
   return axios.post("https://masai-api-mocker.herokuapp.com/auth/login",param)
   .then((r)=>{ dispatch({type:LOGIN_SUCCESS,payload:r.data})
   return LOGIN_SUCCESS
})
   .catch((e)=>{
    dispatch({type:LOGIN_ERROR})
    return LOGIN_ERROR
   })
}
export const logoutAPI = () => ({ type: LOGOUT });