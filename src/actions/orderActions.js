import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './userActions';
import {
   MY_ORDER_LIST_FAIL,
   MY_ORDER_LIST_REQUEST,
   MY_ORDER_LIST_SUCCESS,
   MY_RECENT_ORDER_LIST_FAIL,
   MY_RECENT_ORDER_LIST_REQUEST,
   MY_RECENT_ORDER_LIST_SUCCESS,
   ORDER_CREATE_FAIL,
   ORDER_CREATE_REQUEST,
   ORDER_CREATE_RESET,
   ORDER_CREATE_SUCCESS,
   ORDER_DELIVER_FAIL,
   ORDER_DELIVER_REQUEST,
   ORDER_DELIVER_SUCCESS,
   ORDER_DETAILS_FAIL,
   ORDER_DETAILS_REQUEST,
   ORDER_DETAILS_SUCCESS,
   ORDER_LIST_FAIL,
   ORDER_LIST_REQUEST,
   ORDER_LIST_SUCCESS,
   ORDER_PAY_FAIL,
   ORDER_PAY_REQUEST,
   ORDER_PAY_SUCCESS,
   RECENT_ORDER_LIST_FAIL,
   RECENT_ORDER_LIST_REQUEST,
   RECENT_ORDER_LIST_SUCCESS,
   USER_ORDER_LIST_FAIL,
   USER_ORDER_LIST_REQUEST,
   USER_ORDER_LIST_SUCCESS,
} from '../constants/orderConstants';

export const getOrders = () => (dispatch, getState) => {
   dispatch({ type: ORDER_LIST_REQUEST });

   axios
      .get(
         'https://adefarmsnails.herokuapp.com/api/orders',
         tokenConfig(getState)
      )
      .then((res) => {
         dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: ORDER_LIST_FAIL });
      });
};

export const getRecentOrders = () => (dispatch, getState) => {
   dispatch({ type: RECENT_ORDER_LIST_REQUEST });

   axios
      .get(
         'https://adefarmsnails.herokuapp.com/api/orders/recent/orders',
         tokenConfig(getState)
      )
      .then((res) => {
         dispatch({
            type: RECENT_ORDER_LIST_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: RECENT_ORDER_LIST_FAIL });
      });
};

export const getUserOrders = (id) => (dispatch, getState) => {
   dispatch({ type: USER_ORDER_LIST_REQUEST });

   axios
      .get(
         `https://adefarmsnails.herokuapp.com/api/orders/user/orders/${id}`,
         tokenConfig(getState)
      )
      .then((res) => {
         dispatch({
            type: USER_ORDER_LIST_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: USER_ORDER_LIST_FAIL });
      });
};

// Get a single Order
export const getOrder = (id) => (dispatch, getState) => {
   dispatch({ type: ORDER_DETAILS_REQUEST });

   axios
      .get(
         `https://adefarmsnails.herokuapp.com/api/orders/${id}`,
         tokenConfig(getState)
      )
      .then((res) => {
         dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: ORDER_DETAILS_FAIL });
      });
};

export const createOrder = (order) => (dispatch, getState) => {
   dispatch({ type: ORDER_CREATE_REQUEST });

   axios
      .post(
         'https://adefarmsnails.herokuapp.com/api/orders',
         order,
         tokenConfig(getState)
      )
      .then((res) => {
         dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: res.data,
         });

         dispatch({ type: ORDER_CREATE_RESET });

         localStorage.removeItem('cartItems');
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: ORDER_CREATE_FAIL });
      });
};

export const getMyRecentOrders = () => (dispatch, getState) => {
   dispatch({ type: MY_RECENT_ORDER_LIST_REQUEST });

   axios
      .get(
         'https://adefarmsnails.herokuapp.com/api/orders/myorders/mine/recent',
         tokenConfig(getState)
      )
      .then((res) => {
         dispatch({
            type: MY_RECENT_ORDER_LIST_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: MY_RECENT_ORDER_LIST_FAIL });
      });
};

export const getMyOrders = () => (dispatch, getState) => {
   dispatch({ type: MY_ORDER_LIST_REQUEST });

   axios
      .get(
         'https://adefarmsnails.herokuapp.com/api/orders/myorders/mine',
         tokenConfig(getState)
      )
      .then((res) => {
         dispatch({
            type: MY_ORDER_LIST_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: MY_ORDER_LIST_FAIL });
      });
};

// Make order as paid
export const payOrder = (id) => (dispatch, getState) => {
   dispatch({ type: ORDER_PAY_REQUEST });

   axios
      .put(
         `https://adefarmsnails.herokuapp.com/api/orders/${id}/pay/cash`,
         {},
         tokenConfig(getState)
      )
      .then((res) => {
         dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: res.data,
         });

         dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: ORDER_PAY_FAIL });
      });
};

// Make order as Delivered
export const deliverOrder = (id) => (dispatch, getState) => {
   dispatch({ type: ORDER_DELIVER_REQUEST });

   axios
      .put(
         `https://adefarmsnails.herokuapp.com/api/orders/${id}/deliver`,
         {},
         tokenConfig(getState)
      )
      .then((res) => {
         dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: res.data,
         });

         dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: ORDER_DELIVER_FAIL });
      });
};
