import {
   CART_ADD_ITEM,
   CART_REMOVE_ITEM,
   CART_SAVE_SHIPPING_ADDRESS,
   CART_SAVE_PAYMENT_METHOD,
   CART_CLEAR_ITEMS,
} from '../constants/cartConstants';

export const cartReducer = (
   state = { cartItems: [], shippingAddress: {}, paymentMethod: null },
   action
) => {
   switch (action.type) {
      case CART_ADD_ITEM:
         const item = action.payload;

         const existItem = state.cartItems.find((x) => x.id === item.id);

         if (existItem) {
            return {
               ...state,
               cartItems: state.cartItems.map((x) =>
                  x.id === existItem.id ? item : x
               ),
               success: true,
            };
         } else {
            return {
               ...state,
               cartItems: [...state.cartItems, item],
               success: true,
            };
         }
      case CART_REMOVE_ITEM:
         return {
            ...state,
            cartItems: state.cartItems.filter((x) => x.id !== action.payload),
         };
      case CART_SAVE_SHIPPING_ADDRESS:
         return {
            ...state,
            shippingAddress: action.payload,
         };
      case CART_SAVE_PAYMENT_METHOD:
         return {
            ...state,
            paymentMethod: action.payload,
         };
      case CART_CLEAR_ITEMS:
         return {
            ...state,
            cartItems: [],
         };
      default:
         return state;
   }
};
