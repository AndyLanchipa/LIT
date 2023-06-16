import React from "react";
import logo from "./LITLOGO.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/common/navbar";
import Body from "./components/common/body";
import About from "./components/common/about";
import Contact from "./components/common/contact";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" Component={Body}/>
            <Route path="/about" Component={About}/>
            <Route path="/contact" Component={Contact}/>
          </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
