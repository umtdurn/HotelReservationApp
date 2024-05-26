import axios from "axios"
import { BASE_URL } from "../constant/base_url";


export const getProducts=async(pageNumber=1)=>{
  const resp=await axios.get(BASE_URL+"/GetAllProducts?page="+pageNumber)
  return resp.status==200?resp.data:false
}

export const getProductsWithFilter=async(pageNumber=1,text="")=>{
    const resp=await axios.get(BASE_URL+"/GetProductsByKeyword?page="+pageNumber+"&keyword="+text)
    return resp.status==200?resp.data:false
  }
  


export const getProduct=async(id)=>{
    const resp=await axios.get(BASE_URL+"/GetSingleProduct?id="+id)
    return resp.status==200?resp.data:false
  }
  
export const login=async (mail,password)=>{
  try {
      const resp=await axios.post(BASE_URL+"/Login",{mail,password},{
          headers:{
              "Content-Type": "application/json"
          }
      })
          return resp.status===200 ? resp.data : false
  } catch (error) {
      return false
  }

}

export const register=async (userName,password,mail)=>{
  try {
      const resp=await axios.post(BASE_URL+"/Register",{userName,password,mail},{
          headers:{
              "Content-Type": "application/json"
          }
      })
      return resp.status===201?true:false
  } catch (error) {
      return false
  }

}
