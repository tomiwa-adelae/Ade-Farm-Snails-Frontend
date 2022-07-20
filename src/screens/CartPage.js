import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import { clearErrors } from '../actions/errorActions';
import CartItem from '../components/CartItem';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Showcase from '../components/Showcase';

const CartPage = ({ location }) => {
   const params = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const id = params.id ? params.id : null;
   const headQty = params.qty ? Number(params.qty.split('=')[1]) : 1;

   const cartState = useSelector((state) => state.cart);
   const { cartItems, success } = cartState;

   const loginState = useSelector((state) => state.login);
   const { user } = loginState;

   useEffect(() => {
      dispatch(clearErrors());
      if (id) {
         dispatch(addToCart(id, headQty));
      }

      if (success) {
         navigate('/cart');
      }
   }, [dispatch, id, headQty, navigate, success]);

   const checkOutHandler = () => {
      if (!user) {
         navigate(`/login/redirect=shipping`);
      } else {
         navigate(`/shipping`);
      }
   };

   return (
      <div className="cartpage">
         <Meta title="Ade Farm Snails | Cart" />
         <Showcase
            img="https://res.cloudinary.com/the-tom-media/image/upload/v1658160593/adefarmsnails/5jxktkqTURBXy8zMWI5OWFkYTkyMzllZTg3Y2M3Zjk2Mzc5M2VhZjZhZC5qcGVnkpUDADzNBkDNA4STBc0EsM0Cdg_byvqvr.jpg"
            title="Your Cart"
         />
         <div className="cart">
            <div className="content">
               <div className="boxes">
                  {cartItems.length === 0 && (
                     <Message msg="Your cart is empty!" variant="success" box />
                  )}
                  {cartItems &&
                     cartItems.map((cart) => (
                        <CartItem key={cart.id} cart={cart} />
                     ))}
               </div>
               <div className="sq-box-container">
                  <div className="head">
                     <h3>Cart Summary</h3>
                  </div>

                  <div className="sq-box">
                     <div>
                        <p>Subtotal</p>
                        <span>
                           #{' '}
                           {cartItems
                              .reduce(
                                 (acc, item) => acc + item.qty * item.price,
                                 0
                              )
                              .toFixed(2)}
                        </span>
                     </div>
                     <div>
                        <p>Total Quantity:</p>
                        <span>
                           {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                        </span>
                     </div>
                     <div className="button">
                        <button
                           onClick={() => navigate('/products')}
                           className="btn btn-primary"
                        >
                           Continue Shopping
                        </button>
                        <button
                           onClick={checkOutHandler}
                           className="btn btn-primary"
                           disabled={cartItems.length === 0}
                        >
                           Proceed to Checkout
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CartPage;
