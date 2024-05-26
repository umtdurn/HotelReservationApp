import React,{useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import { logout ,checkAuth} from '../helpers/index';
import { Avatar } from '@mui/material';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
   
    const handleLogout = () => {
        setIsLoggedIn(false)
        logout()
    }

    useEffect(() => {
        const handleCheckAuth = async () => {
          const resp = await checkAuth()
    
          if (resp) {
           setIsLoggedIn(true)
          }
        }
        handleCheckAuth()
    
      }, [])


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar style={{ display: "flex",justifyContent:"space-between", alignItems: "center" }}>
                    {
                        isLoggedIn ?
                            <>
                               <div>
                               <Link to={"/home"} style={{ color: "white", textDecoration: "none", fontSize: "25px", marginRight: "20px" }}>
                                    Home
                                </Link>

                             
                                <Link onClick={handleLogout} to={"/login"} style={{ color: "white", textDecoration: "none", fontSize: "25px" }}>
                                    Logout
                                </Link>
                               </div>
                            <div >
                                <Avatar style={{background:"purple",height:"55px",width:"55px",margin:15}} src='https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'>
                                </Avatar>
                            </div>

                            </>

                            :
                            <>
  <div >

                            </div>
                               <div >
                               <Link to={"/login"} style={{ color: "white", textDecoration: "none", fontSize: "25px", marginRight: "20px" }}>
                                Login
                                </Link>

                                <Link  to={"/register"} style={{ color: "white", textDecoration: "none", fontSize: "25px" }}>
                                Register
                                </Link>
                               </div>
  
                                </>
                    }

                </Toolbar>
            </AppBar>
        </Box>
    );
}
