import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"; // Folosim importul corect aici
import authReducer from "./reducers/authReducer";
import dataReducer from "./reducers/dataReducer";
import campaignReducer from "./reducers/campaignReducer";
import projectReducer from "./reducers/projectReducer";
import crmReducer from "./reducers/crmReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //

const persistConfig = {
  key: "root",
  storage,
  // Specify the reducers you want to persist
  whitelist: ["auth", "data", "crm", "campaign"], // In this example, we persist the 'user' reducer
};

const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
  project: projectReducer,
  campaign: campaignReducer,
  crm: crmReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// eslint-disable-next-line
export const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export default persistor;
// eslint-disable-next-line
// const storeObject = {
//   persistor,
//   store,
// };

// // eslint-disable-next-line
// export default storeObject;
