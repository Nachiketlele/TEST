import { getData, saveData } from "../../utils/localstorage";
import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS } from "./action.type";


const initalState = {
    loading: false,
    error: false,
    isAuth: getData("token")?true: false,
    token: getData("token")||"",
  };

  const authreducer = (state=initalState,{type, payload})=>{
     switch(type){
      case REGISTER_REQUEST:{
         return {...state, loading:true}
      }
      case REGISTER_SUCCESS:{
         return {...state, loading:false}
      }
      case REGISTER_ERROR:{
         return {...state, error:true, loading:false}
      }
      case LOGIN_REQUEST:{
         return {...state, loading:true}
      }
      case LOGIN_SUCCESS:{
         saveData("token",payload)
         return {...state, loading:false, isAuth:true, token:payload}
      }
      case LOGIN_ERROR:{
         return {...state, error:true, loading:false, isAuth:false, token:""}
      }
      case LOGOUT: {
         localStorage.removeItem("token");
         return { ...state, isAuth: false, token: "" };
       }
        default:{
            return state
        }
     }
  }

  export {authreducer}