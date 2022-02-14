import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { addToCart } from "../actions/cartActions";

const CartScreen = () => {
  const { id } = useParams();
  const { search } = useLocation();

  const productId = id;
  const qty = search ? Number(search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return <div>CartScreen</div>;
};

export default CartScreen;
