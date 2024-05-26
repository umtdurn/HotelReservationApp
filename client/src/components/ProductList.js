import { Grid } from '@mui/material'
import React from 'react'
import ProductListItem from "./ProductListItem"

const ProductList = ({products}) => {
  return (
    <Grid container style={{marginTop:"50px"}}>
        {products?.map((product,index)=>
        <Grid xs={3.5} key={index} style={{margin:25}}>
            <ProductListItem product={product}/>
        </Grid>
        )}
    </Grid>
  )
}

export default ProductList