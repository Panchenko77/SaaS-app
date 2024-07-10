import { combineReducers } from "redux";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import dataReducer from "./dataReducer";
import crmReducer from "./crmReducer";
import campaignReducer from "./campaignReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  data: dataReducer,
  crm: crmReducer,
  campaign: campaignReducer,
});

export default rootReducer;
