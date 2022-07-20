import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartItem = ({ cart }) => {
   const dispatch = useDispatch();

   const removeHandler = (id) => {
      dispatch(removeFromCart(id));
   };

   const increaseQty = (qty) => {
      dispatch(addToCart(cart.id, qty + 1));
   };

   const decreaseQty = (qty) => {
      dispatch(addToCart(cart.id, qty - 1));
   };

   return (
      <div className="box">
         <div className="main">
            <div className="img">
               <img src={cart.image} alt={cart.name} />
            </div>
            <div className="details">
               <h4>{cart.name}</h4>
               <h4># {cart.price}</h4>
            </div>
         </div>

         <div className="options">
            <h5 onClick={() => removeHandler(cart.id)}>
               <i className="fas fa-trash"></i> Remove
            </h5>
            <div className="qty">
               <button
                  onClick={() => decreaseQty(cart.qty)}
                  disabled={cart.qty === 1}
                  className="btn btn-primary"
               >
                  <i className="fas fa-minus"></i>
               </button>{' '}
               <h5>{cart.qty}</h5>
               <button
                  onClick={() => increaseQty(cart.qty)}
                  className="btn btn-primary"
               >
                  <i className="fas fa-plus"></i>
               </button>
            </div>
         </div>
      </div>
   );
};

export default CartItem;
