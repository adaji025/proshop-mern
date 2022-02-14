import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Row, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";



const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const navigate = useNavigate()

  const { id } = useParams();

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);

  const { loading, err, product } = productDetails;

  // const [product, setProduct] = useState({})

  useEffect(() => {
    dispatch(listProductDetails(id));
    // const fetchProduct = async () => {
    //   const { data } = await axios.get(`/api/products/${id}`)

    //   setProduct(data)
    // }
    // fetchProduct()
  }, [dispatch]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  return (
    <>
      <Link to="/" className="btn btn-primary my-3">
        Go back
      </Link>

      {loading ? (
        <Loader />
      ) : err ? (
        <Message>{err}</Message>
      ) : (
        <Row>
          <Col lg={6}>
            <Image src={product.image} alt="product image" fluid />
          </Col>
          <Col lg={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>

              { product.countInStock > 0 && (
                <ListGroup variant="flush">
                  <ListGroup.Item>
                  <Row>
                    <Col>QTY</Col>
                    <Col>
                    <Form.Control as='select' value={qty} onChange={ (e) => setQty(e.target.value) } >
                      {  
                      [...Array(product.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))
                    }
                    </Form.Control>
                    </Col>
                  </Row>
                  </ListGroup.Item>
                </ListGroup>
              )}

              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In stock" : "Out of stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup>
                <ListGroup.Item>
                  <Row className="px-2">
                    <Button
                    onClick={addToCartHandler}
                      type="button"
                      className="btn-block"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
