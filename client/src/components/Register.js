import { Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { register } from '../api'
import { checkAuth } from '../helpers/index'
import Swal from 'sweetalert2'

const Row = ({ label, value, setValue }) => {
  return (
    <div style={{ display: "flex", alignItems: "center",margin:"10px" }}>
      <Typography style={{minWidth:"300px"}} variant='h4'>{label}</Typography>
      <TextField value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}

const Register = () => {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
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

  const handleRegister=async ()=>{
    await register(username,password,email).then((resp)=>{
      if(resp){
        Swal.fire("Succesfully registered you are going to redirect to login page!");
        window.location="/login"
        
      }
    })
  }
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "250px" }}>

      <div>
        <Row key={1} label={"Username :"} value={username} setValue={setUsername} />
        <Row key={2} label={"Email :"} value={email} setValue={setEmail} />
        <Row key={3} label={"Password :"} value={password} setValue={setPassword} />

        <Button onClick={()=>handleRegister()} style={{float:"right",width:"100%",marginTop:"50px",height:"60px"}} variant='contained'>
          Register
        </Button>
      </div>
    </div>
  )
}

export default Register