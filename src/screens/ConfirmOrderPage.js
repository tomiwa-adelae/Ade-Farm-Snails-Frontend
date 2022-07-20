import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../actions/orderActions';
import Message from '../components/Message';
import Showcase from '../components/Showcase';
import Loader from '../components/Loader';
import { clearErrors } from '../actions/errorActions';
import Meta from '../components/Meta';

const ConfirmOrderPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const loginState = useSelector((state) => state.login);
   const { user } = loginState;

   const cartState = useSelector((state) => state.cart);
   const { cartItems, shippingAddress, paymentMethod } = cartState;

   const orderState = useSelector((state) => state.singleOrder);
   const { loading, order } = orderState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      if (!user) {
         return navigate('/login/redirect=/');
      }

      dispatch(clearErrors());
      if (order) {
         navigate(`/order/${order._id}`);
      }
   }, [order, navigate, dispatch, user]);

   const toPrice = (num) => Number(num.toFixed(2));
   const itemPrice = toPrice(
      cartItems.reduce((a, c) => a + c.qty * c.price, 0)
   );

   const shippingPrice = toPrice(itemPrice < 1000 ? toPrice(0) : toPrice(3000));

   const totalPrice = toPrice(itemPrice + shippingPrice);

   const placeOrderHandler = () => {
      const order = {
         orderItems: cartItems,
         shippingAddress,
         paymentMethod,
         itemPrice,
         shippingPrice,
         totalPrice,
         user: user.id,
         userObj: user,
      };

      dispatch(createOrder(order));
   };

   return (
      <div className="confirmorderpage">
         <Meta title="Ade Farm Snails | Confirm Order" />
         <Showcase
            img="https://res.cloudinary.com/the-tom-media/image/upload/v1658160593/adefarmsnails/5jxktkqTURBXy8zMWI5OWFkYTkyMzllZTg3Y2M3Zjk2Mzc5M2VhZjZhZC5qcGVnkpUDADzNBkDNA4STBc0EsM0Cdg_byvqvr.jpg"
            title="Confirm Order"
         />
         <div className="confirmorder">
            <div className="content">
               <div className="main">
                  <div className="box">
                     <h4>Shipping</h4>
                     <p>Address: {shippingAddress.address}</p>
                  </div>
                  <div className="box">
                     <h4>Payment</h4>
                     <p>Method: {paymentMethod}</p>
                  </div>
                  <div className="box">
                     <h4>Order Item(s)</h4>
                     {cartItems.length === 0 && (
                        <Message
                           msg="You cart is empty"
                           box
                           variant="success"
                        />
                     )}
                     {cartItems &&
                        cartItems.map((item) => (
                           <div key={item.id} className="item-box">
                              <div className="img">
                                 <img src={item.image} alt={item.name} />
                              </div>
                              <div>
                                 <h5>{item.name}</h5>
                              </div>
                              <div className="qty">
                                 <h5>
                                    {item.qty} x {item.price} = #
                                    {item.qty * item.price}
                                 </h5>
                              </div>
                           </div>
                        ))}
                  </div>
               </div>

               <div className="sq-box-container">
                  <div className="head">
                     <h3>Order Summary</h3>
                  </div>

                  <div className="sq-box">
                     <div>
                        <p>Items:</p>
                        <span># {itemPrice}</span>
                     </div>
                     <div>
                        <p>Shipping Price:</p>
                        <span># {shippingPrice}</span>
                     </div>
                     <div>
                        <p>Total Price:</p>
                        <span># {totalPrice}</span>
                     </div>

                     <div className="button">
                        <button
                           onClick={placeOrderHandler}
                           className="btn btn-primary"
                           disabled={cartItems.length === 0}
                        >
                           {loading ? <Loader /> : ' Place Order'}
                        </button>
                     </div>
                  </div>

                  {msg && <Message msg={msg} variant="error" box />}
               </div>
            </div>
         </div>
      </div>
   );
};

export default ConfirmOrderPage;
