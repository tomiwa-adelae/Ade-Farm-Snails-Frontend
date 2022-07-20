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

export const createOrderReducer = (state = {}, action) => {
   switch (action.type) {
      case ORDER_CREATE_REQUEST:
         return { loading: true };
      case ORDER_CREATE_SUCCESS:
         return { loading: false, order: action.payload };
      case ORDER_CREATE_FAIL:
         return { loading: false };
      case ORDER_CREATE_RESET:
         return {};
      default:
         return state;
   }
};

export const getOrderReducer = (
   state = { order: {}, shippingAddress: {}, userObj: {}, orders: [] },
   action
) => {
   switch (action.type) {
      case ORDER_DETAILS_REQUEST:
         return { loading: true };
      case ORDER_DETAILS_SUCCESS:
         return {
            loading: false,
            order: action.payload,
            shippingAddress: action.payload.shippingAddress,
            userObj: action.payload.userObj,
            orders: action.payload.orderItems,
         };
      case ORDER_DETAILS_FAIL:
         return { loading: false };
      default:
         return state;
   }
};

export const getMyOrdersReducer = (state = { orders: [] }, action) => {
   switch (action.type) {
      case MY_ORDER_LIST_REQUEST:
         return { loading: true };
      case MY_ORDER_LIST_SUCCESS:
         return {
            loading: false,
            orders: action.payload,
         };
      case MY_ORDER_LIST_FAIL:
         return { loading: false };
      default:
         return state;
   }
};

export const getMyRecentOrdersReducer = (state = { orders: [] }, action) => {
   switch (action.type) {
      case MY_RECENT_ORDER_LIST_REQUEST:
         return { loading: true };
      case MY_RECENT_ORDER_LIST_SUCCESS:
         return {
            loading: false,
            orders: action.payload,
         };
      case MY_RECENT_ORDER_LIST_FAIL:
         return { loading: false };
      default:
         return state;
   }
};

export const orderListReducer = (state = { orders: [] }, action) => {
   switch (action.type) {
      case ORDER_LIST_REQUEST:
         return { loading: true };
      case ORDER_LIST_SUCCESS:
         return { loading: false, orders: action.payload };
      case ORDER_LIST_FAIL:
         return { loading: false };
      default:
         return state;
   }
};

export const recentOrderListReducer = (state = { orders: [] }, action) => {
   switch (action.type) {
      case RECENT_ORDER_LIST_REQUEST:
         return { loading: true };
      case RECENT_ORDER_LIST_SUCCESS:
         return { loading: false, orders: action.payload };
      case RECENT_ORDER_LIST_FAIL:
         return { loading: false };
      default:
         return state;
   }
};

export const getUserOrdersReducer = (state = { orders: [] }, action) => {
   switch (action.type) {
      case USER_ORDER_LIST_REQUEST:
         return { loading: true };
      case USER_ORDER_LIST_SUCCESS:
         return {
            loading: false,
            orders: action.payload,
         };
      case USER_ORDER_LIST_FAIL:
         return { loading: false };
      default:
         return state;
   }
};

export const payOrderReducer = (state = { order: {} }, action) => {
   switch (action.type) {
      case ORDER_PAY_REQUEST:
         return { loadingPay: true };
      case ORDER_PAY_SUCCESS:
         return {
            loadingPay: false,
            order: action.payload,
         };
      case ORDER_PAY_FAIL:
         return { loadingPay: false };
      default:
         return state;
   }
};

export const deliverOrderReducer = (state = { order: {} }, action) => {
   switch (action.type) {
      case ORDER_DELIVER_REQUEST:
         return { loadingDeliver: true };
      case ORDER_DELIVER_SUCCESS:
         return {
            loadingDeliver: false,
            order: action.payload,
         };
      case ORDER_DELIVER_FAIL:
         return { loadingDeliver: false };
      default:
         return state;
   }
};
