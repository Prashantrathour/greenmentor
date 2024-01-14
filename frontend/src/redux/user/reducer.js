import { POST_USER_ERROR, POST_USER_REQUEST, POST_USER_SUCCESS } from "./actiontype";

  
  const initialState = {
    isLogin: "",
    isLoading: false,
    isError: false,
    token: null,
    msg:""
  };
  
  const reducer = (state = initialState, { type, payload }) => {
   
    switch (type) {
      case POST_USER_REQUEST:
        return { ...state, isLoading: true, isError: false,msg:"",token:null }; 
  
      case POST_USER_SUCCESS:
       
        if (payload?.token) {
          localStorage.setItem("token", payload?.token);
        }
        return { ...state, isLoading: false, token: payload?.token,msg:payload?.msg,isError:false }; 
  
      case POST_USER_ERROR:
        return { ...state, isLoading: false, isError: true, msg: payload?.msg,token:null }; 
  
      default:
        return state;
    }
  };
  
  export { reducer };
  