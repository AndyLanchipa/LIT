import React, { useState } from "react";
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
import { User } from "./types/user";
import { RequireAuth } from "./components/common/RequireAuth";
import { ExplorePage } from "./pages/explorePage";
import { MessagesPage } from "./pages/messages";
import { ToastContainer } from "react-toastify";

function App() {
  const [user, setUser] = useState<User>();

  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <div className="App">
            <NavBar />
            <Routes>
              <Route element={<RequireAuth />}></Route>
              <Route path="/explore" Component={ExplorePage} />

              <Route path="/" Component={Body} />
              <Route path="/about" Component={About} />
              <Route path="/contact" Component={Contact} />
              <Route path="/login" Component={Login} />
              <Route path="/signup" Component={Signup} />
              <Route path="/messages" Component={MessagesPage} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserProvider>
      <ToastContainer />
    </>
  );
}

export default App;
