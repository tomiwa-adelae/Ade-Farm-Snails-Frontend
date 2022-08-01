import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Showcase from '../components/Showcase';
import { getUserOrders } from '../actions/orderActions';
import AdminEditUserModal from '../components/AdminEditUserModal';
import { clearErrors } from '../actions/errorActions';
import Meta from '../components/Meta';
import dayjs from 'dayjs';

const UserPage = () => {
   const params = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [openModal, setOpenModal] = useState(false);

   const loginState = useSelector((state) => state.login);

   const userDetailsState = useSelector((state) => state.userDetails);
   const { loading, user } = userDetailsState;

   const userOrderState = useSelector((state) => state.userOrder);
   const { loadingOrder = loading, orders } = userOrderState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      if (!loginState.user || !loginState.user.isAdmin) {
         return navigate('/login/redirect=/');
      }

      dispatch(clearErrors());
      dispatch(getUser(params.id));
      dispatch(getUserOrders(params.id));
   }, [dispatch, params, loginState, navigate]);

   return (
      <div className="userpage">
         <Meta title="Ade Farm Snails | Admin User" />
         <Showcase
            img="https://res.cloudinary.com/the-tom-media/image/upload/v1658160593/adefarmsnails/5jxktkqTURBXy8zMWI5OWFkYTkyMzllZTg3Y2M3Zjk2Mzc5M2VhZjZhZC5qcGVnkpUDADzNBkDNA4STBc0EsM0Cdg_byvqvr.jpg"
            title={user ? `${user.firstName} ${user.lastName}` : 'User'}
         />

         {loading && <Loader />}

         {msg && <Message msg={msg} variant="error" box />}

         {user && (
            <div className="user">
               <div className="content">
                  <div className="head">
                     <h3>
                        {user.firstName} {user.lastName}
                     </h3>
                     <h4>{user.email}</h4>
                     <h4>{user.phoneNumber}</h4>
                     <h5>{user.isAdmin ? 'Admin' : 'Not Admin'}</h5>
                     <i
                        onClick={() => setOpenModal(true)}
                        className="fas fa-edit"
                     ></i>
                  </div>

                  {openModal && (
                     <AdminEditUserModal
                        userObj={user}
                        closeModal={() => {
                           setOpenModal(false);
                           dispatch(clearErrors());
                        }}
                     />
                  )}

                  <div className="main">
                     <h3>{user.firstName}'s Orders</h3>

                     {loadingOrder && <Loader />}

                     {msg && <Message msg={msg} variant="error" box />}

                     {orders && orders.length === 0 && (
                        <Message
                           msg={`${user.firstName} has no Order!`}
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
         )}
      </div>
   );
};

export default UserPage;
