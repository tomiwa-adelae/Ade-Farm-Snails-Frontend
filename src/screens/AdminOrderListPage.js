import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Showcase from '../components/Showcase';
import { getOrders } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { clearErrors } from '../actions/errorActions';
import Meta from '../components/Meta';
import dayjs from 'dayjs';

const AdminOrderListPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const loginState = useSelector((state) => state.login);
   const { user } = loginState;

   const orderState = useSelector((state) => state.orderList);
   const { loading, orders } = orderState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      dispatch(clearErrors());
      if (!user || !user.isAdmin) {
         return navigate('/login/redirect=/');
      }

      dispatch(getOrders());
   }, [navigate, user, dispatch]);

   return (
      <div className="adminorderlistpage">
         <Meta title="Ade Farm Snails | Admin Orders" />
         <Showcase
            img="https://res.cloudinary.com/the-tom-media/image/upload/v1658160593/adefarmsnails/5jxktkqTURBXy8zMWI5OWFkYTkyMzllZTg3Y2M3Zjk2Mzc5M2VhZjZhZC5qcGVnkpUDADzNBkDNA4STBc0EsM0Cdg_byvqvr.jpg"
            title="All Orders"
         />

         <div className="adminorderlist">
            <div className="content">
               <div className="main">
                  <h3>All Orders</h3>

                  {loading && <Loader />}

                  {msg && <Message msg={msg} variant="error" box />}

                  {orders && orders.length === 0 && (
                     <Message msg="You have no Orders!" variant="success" box />
                  )}

                  {orders &&
                     orders.map((order) => (
                        <Link key={order._id} to={`/admin/order/${order._id}`}>
                           <div className="item-box">
                              <div className="img">
                                 <img
                                    src={order.orderItems[0].image}
                                    alt={order.orderItems[0].image}
                                 />
                              </div>
                              <div className="name">
                                 <h5>
                                    {order.userObj.firstName}{' '}
                                    {order.userObj.lastName}
                                 </h5>
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
                                    <h5>
                                       {' '}
                                       <i className="fas fa-check text-success"></i>{' '}
                                       Paid
                                    </h5>
                                 ) : (
                                    <h5>
                                       <i className="fas fa-exclamation-circle text-danger"></i>{' '}
                                       Not Paid
                                    </h5>
                                 )}
                              </div>
                              <div>
                                 {order.isDelivered ? (
                                    <h5>
                                       {' '}
                                       <i className="fas fa-check text-success"></i>{' '}
                                       Delivered
                                    </h5>
                                 ) : (
                                    <h5>
                                       {' '}
                                       <i className="fas fa-exclamation-circle text-danger"></i>{' '}
                                       Not delivered
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

export default AdminOrderListPage;
