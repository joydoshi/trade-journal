import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import journalsReducer from "./journalsReducer";
import tasksReducer from "./tasksReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  journals: journalsReducer,
  tasks: tasksReducer
});
