import { GETTASK_ERROR, GETTASK_REQUEST, GETTASK_SUCCESS } from "./action.type";



const initalState = {
    loading: false,
    error: false,
    tasks: [],
  };

  const appreducer = (state=initalState,{type, payload})=>{
     switch(type){
      case GETTASK_REQUEST:{
         return {...state, loading:true}
      }
      case GETTASK_SUCCESS:{
         return {...state, loading:false, tasks:payload}
      }
      case GETTASK_ERROR:{
         return {...state, error:true, loading:false}
      }
        default:{
            return state
        }
     }
  }
  export {appreducer}