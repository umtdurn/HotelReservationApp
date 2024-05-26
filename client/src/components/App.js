import React, { useEffect, useState } from "react";
import Login from "./Login";

import Register from "./Register";
import { checkAuth } from "../helpers/index";
import { Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import DetailPage from "./DetailPage";

const ProtectedRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    console.log(isAuthenticated);
    window.location = ("/login");
  }
  return (<Outlet />);
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleCheckAuth = async () => {
      const resp = await checkAuth()
      setIsLoggedIn(resp)
      setLoading(true)
    }
    handleCheckAuth()

  }, [])




  return (
    <Router >
     <Header isLoggedIn={isLoggedIn}  setIsLoggedIn={setIsLoggedIn}/>
     {loading ?
        <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute isAuthenticated={isLoggedIn} />}>
          <Route path="/home" element={<Home />} exact />
          <Route path="/products/:id" element={<DetailPage />} exact />
        </Route>
      </Routes>
        : <React.Fragment></React.Fragment>}


    </Router>
  );
}

export default App;
