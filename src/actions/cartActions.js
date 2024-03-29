import axios from 'axios';
import {
   CART_REMOVE_ITEM,
   CART_SAVE_SHIPPING_ADDRESS,
   CART_SAVE_PAYMENT_METHOD,
   CART_ADD_ITEM,
} from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
   const { data } = await axios.get(
      // `https://adefarmsnails.herokuapp.com/api/products/${id}`
      `https://adefarmsnails.onrender.com/api/products/${id}`
   );

   dispatch({
      type: CART_ADD_ITEM,
      payload: {
         id: data._id,
         name: data.name,
         image: data.image,
         price: data.price,
         qty,
      },
   });

   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
   dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
   });

   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
   dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
   });

   localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
   dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
   });

   localStorage.setItem('paymentMethod', JSON.stringify(data));
};
