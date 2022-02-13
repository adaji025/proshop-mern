import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { listProduct } from "../actions/productActions";


const HomeScreen = () => {
const dispatch = useDispatch()

const productList = useSelector(state => state.productList)
const {  loading, err, products } = productList

  useEffect( () => {
    dispatch(listProduct())    
  }, [dispatch])

  return (
    <>
      <h1>Latset Products</h1>

      {loading ? <h2>Loading...</h2> : err ? <h3>{err}</h3> :
      <Row>
        {products.map((product) => {
          return(
            <Col sm={12} md={6} lg={3} key={product._id}>
            <Product product={product} />
          </Col>
          )
        })}
      </Row>
      
      }
    </>
  );
};

export default HomeScreen;
