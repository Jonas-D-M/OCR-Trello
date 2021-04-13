import { combineReducers } from "redux";

import loginReducer from "./loginReducer";

const allReducers = combineReducers({ user: loginReducer });

export default allReducers;
