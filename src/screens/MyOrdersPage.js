import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Showcase from '../components/Showcase';
import { getMyOrders } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { clearErrors } from '../actions/errorActions';
import Meta from '../components/Meta';
import dayjs from 'dayjs';

const MyOrdersPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const loginState = useSelector((state) => state.login);
   const { user } = loginState;

   const myOrderState = useSelector((state) => state.myOrders);
   const { loading, orders } = myOrderState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      dispatch(clearErrors());
      if (!user) {
         return navigate('/login/redirect=/');
      }

      dispatch(getMyOrders());
   }, [navigate, user, dispatch]);

   return (
      <div className="myorderspage">
         <Meta title="Ade Farm Snails | My Orders" />
         <Showcase
            img="https://res.cloudinary.com/the-tom-media/image/upload/v1658160593/adefarmsnails/5jxktkqTURBXy8zMWI5OWFkYTkyMzllZTg3Y2M3Zjk2Mzc5M2VhZjZhZC5qcGVnkpUDADzNBkDNA4STBc0EsM0Cdg_byvqvr.jpg"
            title="All Orders"
         />

         <div className="myorders">
            <div className="content">
               <div className="main">
                  <h3>All Orders</h3>

                  {loading && <Loader />}

                  {msg && <Message msg={msg} variant="error" box />}

                  {orders && orders.length === 0 && (
                     <Message
                        msg="You have no Orders! Order today"
                        variant="success"
                        box
                     />
                  )}

                  {orders &&
                     orders.map((order) => (
                        <Link key={order._id} to={`/order/${order._id}`}>
                           <div className="item-box">
                              <div className="img">
                                 <img
                                    src={order.orderItems[0].image}
                                    alt={order.orderItems[0].image}
                                 />
                              </div>
                              <div className="name">
                                 <h5>{order.orderItems[0].name}</h5>
                              </div>
                              <div>
                                 <h5># {order.totalPrice}</h5>
                              </div>
                              <div>
                                 <h5>
                                    {dayjs(order.updatedAt).format(
                                       'DD-MM YYYY'
                                    )}
                                 </h5>
                              </div>
                              <div>
                                 {order.isPaid ? (
                                    <h5 className="text-success">Paid</h5>
                                 ) : (
                                    <h5 className="text-danger">Not Paid</h5>
                                 )}
                              </div>
                              <div>
                                 {order.isDelivered ? (
                                    <h5 className="text-success">Delivered</h5>
                                 ) : (
                                    <h5 className="text-danger">
                                       Not Delivered
                                    </h5>
                                 )}
                              </div>
                           </div>
                        </Link>
                     ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default MyOrdersPage;
