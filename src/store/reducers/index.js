import { combineReducers } from "redux";

import contact from "./contact";

const appReducer = combineReducers({ contact });

const rootReducer = (state = {}, action) => {  
  return appReducer(state, action);
};

export default rootReducer;
