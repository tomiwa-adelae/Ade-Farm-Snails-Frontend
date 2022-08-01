import {
   ADMIN_USER_CREATE_FAIL,
   ADMIN_USER_CREATE_REQUEST,
   ADMIN_USER_CREATE_RESET,
   ADMIN_USER_CREATE_SUCCESS,
   ADMIN_USER_UPDATE_FAIL,
   ADMIN_USER_UPDATE_REQUEST,
   ADMIN_USER_UPDATE_RESET,
   ADMIN_USER_UPDATE_SUCCESS,
   GET_USER_RESET_PASSWORD_FAIL,
   GET_USER_RESET_PASSWORD_REQUEST,
   GET_USER_RESET_PASSWORD_RESET,
   GET_USER_RESET_PASSWORD_SUCCESS,
   RECENT_USER_LIST_FAIL,
   RECENT_USER_LIST_REQUEST,
   RECENT_USER_LIST_SUCCESS,
   USER_DETAILS_FAIL,
   USER_DETAILS_REQUEST,
   USER_DETAILS_SUCCESS,
   USER_LIST_FAIL,
   USER_LIST_REQUEST,
   USER_LIST_SUCCESS,
   USER_LOGIN_FAIL,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_LOGOUT,
   USER_REGISTER_FAIL,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
   USER_RESET_PASSWORD_FAIL,
   USER_RESET_PASSWORD_REQUEST,
   USER_RESET_PASSWORD_RESET,
   USER_RESET_PASSWORD_SUCCESS,
   USER_UPDATE_FAIL,
   USER_UPDATE_REQUEST,
   USER_UPDATE_RESET,
   USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

export const loginReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_LOGIN_REQUEST:
         return { loading: true };
      case USER_LOGIN_SUCCESS:
         return {
            loading: false,
            user: action.payload.user,
            token: action.payload.token,
         };
      case USER_LOGIN_FAIL:
         return { loading: false };
      case USER_LOGOUT:
         return {};
      default:
         return state;
   }
};

export const registerReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_REGISTER_REQUEST:
         return { loading: true };
      case USER_REGISTER_SUCCESS:
         return {
            loading: false,
            user: action.payload.user,
            token: action.payload.token,
         };
      case USER_REGISTER_FAIL:
         return { loading: false };
      case USER_LOGOUT:
         return {};
      default:
         return state;
   }
};

export const adminCreateUserReducer = (state = {}, action) => {
   switch (action.type) {
      case ADMIN_USER_CREATE_REQUEST:
         return { loading: true };
      case ADMIN_USER_CREATE_SUCCESS:
         return {
            loading: false,
            success: true,
         };
      case ADMIN_USER_CREATE_FAIL:
         return { loading: false };
      case ADMIN_USER_CREATE_RESET:
         return {};
      default:
         return state;
   }
};

export const userUpdateReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_UPDATE_REQUEST:
         return { loading: true };
      case USER_UPDATE_SUCCESS:
         return {
            loading: false,
            user: action.payload.user,
            token: action.payload.token,
            success: true,
         };
      case USER_UPDATE_FAIL:
         return { loading: false };
      case USER_UPDATE_RESET:
         return {};
      default:
         return state;
   }
};

export const adminUserUpdateReducer = (state = {}, action) => {
   switch (action.type) {
      case ADMIN_USER_UPDATE_REQUEST:
         return { loading: true };
      case ADMIN_USER_UPDATE_SUCCESS:
         return {
            loading: false,
            user: action.payload.user,
            success: true,
         };
      case ADMIN_USER_UPDATE_FAIL:
         return { loading: false };
      case ADMIN_USER_UPDATE_RESET:
         return {};
      default:
         return state;
   }
};

export const userListReducer = (state = { users: [] }, action) => {
   switch (action.type) {
      case USER_LIST_REQUEST:
         return { loading: true };
      case USER_LIST_SUCCESS:
         return { loading: false, users: action.payload };
      case USER_LIST_FAIL:
         return { loading: false };
      default:
         return state;
   }
};

export const recentUserListReducer = (state = { users: [] }, action) => {
   switch (action.type) {
      case RECENT_USER_LIST_REQUEST:
         return { loading: true };
      case RECENT_USER_LIST_SUCCESS:
         return { loading: false, users: action.payload };
      case RECENT_USER_LIST_FAIL:
         return { loading: false };
      default:
         return state;
   }
};

export const userReducer = (state = { user: {}, orders: [] }, action) => {
   switch (action.type) {
      case USER_DETAILS_REQUEST:
         return { loading: true };
      case USER_DETAILS_SUCCESS:
         return {
            loading: false,
            user: action.payload.user,
            orders: action.payload.orders,
         };
      case USER_DETAILS_FAIL:
         return { loading: false };
      default:
         return state;
   }
};

export const forgotPasswordReducer = (state = {}, action) => {
   switch (action.type) {
      case GET_USER_RESET_PASSWORD_REQUEST:
         return { loading: true };
      case GET_USER_RESET_PASSWORD_SUCCESS:
         return { loading: false, successMsg: action.payload.msg };
      case GET_USER_RESET_PASSWORD_FAIL:
         return { loading: false };
      case GET_USER_RESET_PASSWORD_RESET:
         return {};
      default:
         return state;
   }
};

export const resetPasswordReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_RESET_PASSWORD_REQUEST:
         return { loading: true };
      case USER_RESET_PASSWORD_SUCCESS:
         return { loading: false, successMsg: action.payload.msg };
      case USER_RESET_PASSWORD_FAIL:
         return { loading: false };
      case USER_RESET_PASSWORD_RESET:
         return {};
      default:
         return state;
   }
};
