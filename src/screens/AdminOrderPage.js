import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Showcase from '../components/Showcase';
import { deliverOrder, getOrder, payOrder } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { clearErrors } from '../actions/errorActions';
import Meta from '../components/Meta';

const AdminOrderPage = () => {
   const dispatch = useDispatch();
   const params = useParams();
   const navigate = useNavigate();

   const loginState = useSelector((state) => state.login);
   const { user } = loginState;

   const orderState = useSelector((state) => state.order);
   const { order, loading, shippingAddress, userObj, orders } = orderState;

   const payState = useSelector((state) => state.payOrder);
   const { loadingPay } = payState;

   const deliverState = useSelector((state) => state.deliverOrder);
   const { loadingDeliver } = deliverState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      if (!user || !user.isAdmin) {
         return navigate('/login/redirect=/');
      }

      dispatch(clearErrors());
      dispatch(getOrder(params.id));
   }, [dispatch, params, navigate, user]);

   const handlePayOrder = () => {
      dispatch(payOrder(params.id));
   };

   const handleDeliverOrder = () => {
      dispatch(deliverOrder(params.id));
   };

   return (
      <div className="orderpage">
         <Meta title="Ade Farm Snails | Admin Order" />
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

                           {!order.isPaid ? (
                              <div className="button">
                                 <button
                                    onClick={handlePayOrder}
                                    className="btn btn-primary"
                                 >
                                    {loadingPay ? <Loader /> : 'Mark as Paid'}
                                 </button>
                              </div>
                           ) : (
                              !order.isDelivered && (
                                 <div className="button">
                                    <button
                                       onClick={handleDeliverOrder}
                                       className="btn btn-primary"
                                    >
                                       {loadingDeliver ? (
                                          <Loader />
                                       ) : (
                                          'Mark as Delivered'
                                       )}
                                    </button>
                                 </div>
                              )
                           )}
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

export default AdminOrderPage;
