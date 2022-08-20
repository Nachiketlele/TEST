import axios from "axios"
import { GETTASK_ERROR, GETTASK_REQUEST, GETTASK_SUCCESS, UPDATE_ERROR, UPDATE_REQUEST, UPDATE_SUCCESS } from "./action.type"


export const gettask = () =>(dispatch)=>{
    dispatch({type:GETTASK_REQUEST})
   return axios.get(" http://localhost:5000/tasks")
    .then((r)=>{
        dispatch({type:GETTASK_SUCCESS,payload:r.data})
    })
    .catch((e)=>{
        dispatch({type:GETTASK_ERROR})
    })
}
export const updatetask = (id, payload) =>(dispatch)=>{
    dispatch({type:UPDATE_REQUEST})
   return axios.patch(`http://localhost:5000/tasks/${id}`,payload)
    .then((r)=>{
        dispatch({type:UPDATE_SUCCESS,payload:r.data})
    })
    .catch((e)=>{
        dispatch({type:UPDATE_ERROR})
    })
}