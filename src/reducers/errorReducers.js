import { GET_ERRORS, CLEAR_ERRORS } from '../constants/errorConstants';

export const errorReducer = (state = {}, action) => {
   switch (action.type) {
      case GET_ERRORS:
         return {
            msg: action.payload.msg,
         };
      case CLEAR_ERRORS:
         return {
            msg: null,
         };
      default:
         return state;
   }
};
