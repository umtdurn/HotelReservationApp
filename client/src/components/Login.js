import { Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { login } from '../api'
import { checkAuth } from '../helpers/index'

const Row = ({ label, value, setValue }) => {
  return (
    <div style={{ display: "flex", alignItems: "center",margin:"10px" }}>
      <Typography style={{minWidth:"300px"}} variant='h4'>{label}</Typography>
      <TextField value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
 
  useEffect(() => {
    const handleCheckAuth = async () => {
      const resp = await checkAuth()
      if (resp) {
        window.location="/home"
      }
    }
    handleCheckAuth()

  }, [])


    const handleLogin = async () => {
      try {
        const resp = await login(username, password);
        if (resp) {
          console.log(resp);
          document.cookie = `user_token=${resp.token}; path=/;`;
           setIsLoggedIn(true)
        window.location="/home"
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    };
  


  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "250px" }}>

      <div>
        <Row key={1} label={"Mail :"} value={username} setValue={setUsername} />
        <Row key={3} label={"Password :"} value={password} setValue={setPassword} />
        
        <Button onClick={()=>handleLogin()} style={{float:"right",width:"100%",marginTop:"50px",height:"60px"}} variant='contained'>
          Login
        </Button>
      </div>
    </div>
  )
}

export default Login