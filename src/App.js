import React from "react"

import ReactDOM from "react-dom/client";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";
import { useState, createContext } from "react";

import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ChooseRole from "components/Users/ChooseRole";
import Products from "views/examples/Products";
import ProductHistory from "views/examples/ProductHistory.js";
import {wallet} from "./Store.js"

function App() {
    const address="0x26642bB163D7A91574d97c4020319091BE96F164"
    
  
    return (
      <div id="root">
            <wallet.Provider value={address} >
        <BrowserRouter>
    
<Routes>
  
      <Route
       exact path="/"
        element={<Index />}
      />
      <Route
        path="/register-page"
        element={<LandingPage />}
      />
      <Route
        path="/choose-role"
        element={<ChooseRole />}
      />
      <Route
        path="/productHistory/:id"
        element={<ProductHistory />}
      />
      <Route path="/products" element={<Products />} />


     
    </Routes>
    
  </BrowserRouter>
  </wallet.Provider>
      </div>
    );
  }
  
export default App;
  