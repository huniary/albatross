import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {applyMiddleware, createStore} from "redux";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import rootReducer from "./modules";
import {composeWithDevTools} from "redux-devtools-extension";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { tempSetUser,check } from "./modules/user";
import logger from "redux-logger";
import {HelmetProvider} from "react-helmet-async";


//크리엣스토아는 리듀사가필요//스토어가만들어질때 로컬스트레지를동시에 get해야한다.
const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(ReduxThunk, logger)));


function loadUser(){
  try{
    const user = localStorage.getItem("user");
    if(!user) return;

    //store 직접 접속  
    store.dispatch(tempSetUser(JSON.parse(user)));
    store.dispatch(check());
  }catch(error){  
    console.log("로컬스트레지 일안해요");
  }
}

loadUser();



const root = createRoot(document.getElementById("root"))

root.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
              {/* 퍼블릭_URL 깃허브꺼  */}
      {/* <HelmetProvider>   */}
        <App />
      {/* </HelmetProvider> */}
    </BrowserRouter>
  </Provider> 
);