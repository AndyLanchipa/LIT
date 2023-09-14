import React from "react";
import logo from "./LITLOGO.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./pages/navbar";
import Body from "./pages/body";
import About from "./pages/about";
import Contact from "./pages/contact";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { UserProvider } from "./components/context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" Component={Body} />
            <Route path="/about" Component={About} />
            <Route path="/contact" Component={Contact} />
            <Route path="/login" Component={Login} />
            <Route path="/signup" Component={Signup} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
