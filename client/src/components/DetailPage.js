import React, { useEffect, useState } from 'react'
import { getProduct } from '../api'
import { getProductAction } from "../redux/actions/detailPageAction"
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Typography } from '@mui/material'

const DetailPage = (props) => {
  const { id } = useParams()
  const { getProductAction } = props
  const [product, setProduct] = useState({})

  const handleGetProduct = async () => {
    const resp = await getProduct(id)
    if (resp) {
      getProductAction(resp)
      setProduct(resp)
    }
  }

  useEffect(() => {

    handleGetProduct()
  }, [])

  return (
    <div>

      <div style={{ marginTop: "100px", marginBottom: "10px" }}>
        <Typography textAlign={"center"} variant='h3'>
          {product.title} 
        <strong style={{ color: "green" }}>{"   "+product?.rating?.score + "/10" + " (" + product?.rating?.reviews + ")    "}
        </strong>
        <strong style={{color:"darkred"}}>
        {product?.price?.value}$
        </strong>
        </Typography>
        <Typography textAlign={"center"} variant='h6'>{product.location}</Typography>
      </div>


      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
        <img style={{ width: "60%", height: "400px" }} src={product.thumbnail}></img>
      </div>
     <div style={{display:"flex",justifyContent:"space-evenly"}}>
     <div style={{  marginTop: "50px" }}>

<Typography color={"green"} variant='h5'>
  <strong>
    {product.sustainability}
  </strong></Typography>


<ul>
  {product?.highlights?.map((item, index) =>
    <li key={index}>
      <Typography variant='h6'>{item}</Typography>
    </li>
  )}
</ul>
</div>

<div style={{margin:20,display:"flex",alignItems:"center"}}>
      <a href={product?.link} target='_blank'>
        <Button variant='contained'>
          View the Hotel
        </Button>
      </a>
</div>
     </div>





    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  getProductAction: (products) => {
    dispatch(getProductAction(products));
  },
});

export default connect(null, mapDispatchToProps)(DetailPage);