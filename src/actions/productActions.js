import axios from 'axios';
import {
   PRODUCT_CREATE_FAIL,
   PRODUCT_CREATE_REQUEST,
   PRODUCT_CREATE_RESET,
   PRODUCT_CREATE_REVIEW_FAIL,
   PRODUCT_CREATE_REVIEW_REQUEST,
   PRODUCT_CREATE_REVIEW_RESET,
   PRODUCT_CREATE_REVIEW_SUCCESS,
   PRODUCT_CREATE_SUCCESS,
   PRODUCT_DELETE_FAIL,
   PRODUCT_DELETE_REQUEST,
   PRODUCT_DELETE_SUCCESS,
   PRODUCT_DETAILS_FAIL,
   PRODUCT_DETAILS_REQUEST,
   PRODUCT_DETAILS_SUCCESS,
   PRODUCT_LIST_FAIL,
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS,
   PRODUCT_UPDATE_FAIL,
   PRODUCT_UPDATE_REQUEST,
   PRODUCT_UPDATE_RESET,
   PRODUCT_UPDATE_SUCCESS,
   RECENT_PRODUCT_FAIL,
   RECENT_PRODUCT_REQUEST,
   RECENT_PRODUCT_SUCCESS,
} from '../constants/productConstants';
import { returnErrors } from './errorActions';
import { tokenConfig } from './userActions';

export const getRecentProducts = () => (dispatch) => {
   dispatch({ type: RECENT_PRODUCT_REQUEST });

   axios
      .get('/api/products/recent/products')
      .then((res) =>
         dispatch({
            type: RECENT_PRODUCT_SUCCESS,
            payload: res.data,
         })
      )
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: RECENT_PRODUCT_FAIL });
      });
};

export const getProducts =
   (keyword = '') =>
   (dispatch) => {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      axios
         .get(`/api/products?keyword=${keyword}`)
         .then((res) =>
            dispatch({
               type: PRODUCT_LIST_SUCCESS,
               payload: res.data,
            })
         )
         .catch((err) => {
            dispatch(returnErrors(err.response.data.msg));
            dispatch({ type: PRODUCT_LIST_FAIL });
         });
   };

export const getProduct = (id) => (dispatch) => {
   dispatch({ type: PRODUCT_DETAILS_REQUEST });

   axios
      .get(`/api/products/${id}`)
      .then((res) =>
         dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: res.data,
         })
      )
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: PRODUCT_DETAILS_FAIL });
      });
};

export const createProduct = (product) => (dispatch, getState) => {
   dispatch({ type: PRODUCT_CREATE_REQUEST });

   axios
      .post('/api/products', product, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: res.data,
         });

         dispatch({ type: PRODUCT_CREATE_RESET });
      })

      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: PRODUCT_CREATE_FAIL });
      });
};

export const createProductReview = (id, review) => (dispatch, getState) => {
   dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

   axios
      .post(`/api/products/${id}/reviews`, review, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: res.data,
         });

         dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: res.data.product });

         dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      })

      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: PRODUCT_CREATE_REVIEW_FAIL });
      });
};

export const updateProduct = (product) => (dispatch, getState) => {
   dispatch({ type: PRODUCT_UPDATE_REQUEST });

   axios
      .put('/api/products', product, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: res.data,
         });

         dispatch({ type: PRODUCT_UPDATE_RESET });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: PRODUCT_UPDATE_FAIL });
      });
};

export const deleteProductAction = (id, publicId) => (dispatch, getState) => {
   dispatch({ type: PRODUCT_DELETE_REQUEST });

   const publicIdObj = {
      publicId,
   };

   axios
      .post('/api/uploads/delete', publicIdObj)
      .then((res) => {
         return;
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: PRODUCT_DELETE_FAIL });
      });

   axios
      .delete(`/api/products/${id}`, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: res.data,
         });
      })

      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({ type: PRODUCT_DELETE_FAIL });
      });
};
