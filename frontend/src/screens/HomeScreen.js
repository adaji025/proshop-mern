import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Loader from '../components/Loader'
import Message from '../components/Message'
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

      {loading ? <Loader /> : err ? <Message  variant='danger'>{err}</Message> :
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
