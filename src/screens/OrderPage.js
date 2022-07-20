import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Showcase from '../components/Showcase';
import { getOrder } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { clearErrors } from '../actions/errorActions';
import Meta from '../components/Meta';

const OrderPage = () => {
   const dispatch = useDispatch();
   const params = useParams();
   const navigate = useNavigate();

   const loginState = useSelector((state) => state.login);
   const { user } = loginState;

   const orderState = useSelector((state) => state.order);
   const { order, loading, shippingAddress, userObj, orders } = orderState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      if (!user) {
         return navigate('/login/redirect=/');
      }

      dispatch(clearErrors());
      dispatch(getOrder(params.id));
   }, [dispatch, params, navigate, user]);

   return (
      <div className="orderpage">
         <Meta title="Ade Farm Snails | Order" />
         <Showcase
            img="https://res.cloudinary.com/the-tom-media/image/upload/v1658160593/adefarmsnails/5jxktkqTURBXy8zMWI5OWFkYTkyMzllZTg3Y2M3Zjk2Mzc5M2VhZjZhZC5qcGVnkpUDADzNBkDNA4STBc0EsM0Cdg_byvqvr.jpg"
            title="Order"
         />

         {loading && <Loader />}

         <div className="order">
            {msg && <Message msg={msg} variant="error" box />}
            {order && (
               <div className="content">
                  <div className="main">
                     <div className="box">
                        <h4>Shipping</h4>
                        <p>
                           Name: {userObj.firstName} {userObj.lastName}
                        </p>
                        <p>Email: {userObj.email}</p>
                        <p>Phone Number: {userObj.phoneNumber}</p>
                        <p>
                           Address : {shippingAddress.address},{' '}
                           {shippingAddress.city},{shippingAddress.country}
                        </p>

                        {order.isDelivered ? (
                           <Message
                              variant="success"
                              box
                              msg={`Delivered on ${order.deliveredAt}`}
                           />
                        ) : (
                           <Message variant="error" box msg="Not Delivered" />
                        )}
                     </div>
                     <div className="box">
                        <h4>Payment</h4>
                        <p>Method: {order.paymentMethod}</p>

                        {order.isPaid ? (
                           <Message
                              variant="success"
                              box
                              msg={`Paid on ${order.paidAt}`}
                           />
                        ) : (
                           <Message variant="error" box msg="Not Paid" />
                        )}
                     </div>
                     <div className="box">
                        <h4>Order Item(s)</h4>

                        {orders.map((item) => (
                           <div key={item._id} className="item-box">
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

                     <div className="sq-box-container">
                        <div className="head">
                           <h3>Order Summary</h3>
                        </div>

                        <div className="sq-box">
                           <div>
                              <p>Items:</p>
                              <span># {order.itemPrice}</span>
                           </div>
                           <div>
                              <p>Shipping Price:</p>
                              <span># {order.shippingPrice}</span>
                           </div>
                           <div>
                              <p>Total Price:</p>
                              <span># {order.totalPrice}</span>
                           </div>

                           <Link to="/my-orders" className="button">
                              <button className="btn btn-primary">
                                 My Orders
                              </button>
                           </Link>
                        </div>

                        {msg && <Message msg={msg} variant="error" box />}
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default OrderPage;
