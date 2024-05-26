import React, { useEffect, useState } from 'react'
import { getProducts, getProductsWithFilter } from '../api'
import { getProductsAction } from '../redux/actions/productAction'
import ProductList from './ProductList'
import { connect } from "react-redux";
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Button, CircularProgress, Grid, Pagination, Stack, Typography } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const Home = (props) => {
  const { getProductsAction } = props
  const [searchText, setSearchText] = useState("")
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(10)
  const [userId, setUserId] = useState("")

  const handleChange = (event, value) => {
    setPage(value);
  };


  const handleGetProducts = async () => {
    const resp = await getProducts(page)
    if (resp) {
      getProductsAction(resp)
      setProducts(resp.data)
      setPage(resp.page)
      setTotalPage(resp.totalPage)
    }
  }

  const handleGetProductsWithFilter = async () => {
    const resp = await getProductsWithFilter(1, searchText)
    if (resp) {
      getProductsAction(resp)
      setProducts(resp.data)
      setPage(resp.page)
      setTotalPage(resp.totalPage)
    }
  }

  useEffect(() => {
    handleGetProducts()
  }, [page])




  return (

    loading ?
      <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "300px" }}>
        <CircularProgress size={"100px"}></CircularProgress>
      </div>
      :

      <div style={{ marginLeft: "20%", marginRight: "20%", margin: 50 }}>
        <div style={{
          display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <TextField value={searchText} onChange={(e) => setSearchText(e.target.value)} style={{ width: "50%", marginRight: "20px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={handleGetProductsWithFilter}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => setSearchText("")}
                >
                  <ClearIcon />
                </InputAdornment>
              )
            }}
          />

        </div>

        <ProductList products={products} />


        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", margin: 25 }}>
          <Stack spacing={2}>
            <Pagination count={totalPage} page={page} onChange={handleChange} />
          </Stack>
        </div>
      </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  getProductsAction: (products) => {
    dispatch(getProductsAction(products));
  },
});

export default connect(null, mapDispatchToProps)(Home);