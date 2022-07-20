import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import Showcase from '../components/Showcase';
// import { logoutUser } from '../actions/userActions';
import { getUser } from '../actions/userActions';
import { getMyRecentOrders } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import EditDetailsModal from '../components/EditDetailsModal';
// import ChangePasswordModal from '../components/ChangePasswordModal';
import { clearErrors } from '../actions/errorActions';
import Meta from '../components/Meta';

const MyAccountPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [openModal, setOpenModal] = useState(false);

   const loginState = useSelector((state) => state.login);
   // const { user } = loginState;

   // console.log(loginState);

   // const myRecentOrderState = useSelector((state) => state.myRecentOrders);
   // const { loading, orders } = myRecentOrderState;

   // console.log(myRecentOrderState);

   const userDetailsState = useSelector((state) => state.userDetails);
   const { loading, user, orders } = userDetailsState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      if (!loginState.user) {
         return navigate('/login/redirect=/');
      }

      dispatch(clearErrors());
      dispatch(getUser(loginState.user.id));
      dispatch(getMyRecentOrders());
   }, [dispatch, loginState, navigate]);

   return (
      <div className="myaccountpage">
         <Meta title="Ade Farm Snails | My Account" />
         <Showcase
            img="https://res.cloudinary.com/the-tom-media/image/upload/v1658160593/adefarmsnails/5jxktkqTURBXy8zMWI5OWFkYTkyMzllZTg3Y2M3Zjk2Mzc5M2VhZjZhZC5qcGVnkpUDADzNBkDNA4STBc0EsM0Cdg_byvqvr.jpg"
            title={user ? `${user.firstName} ${user.lastName}` : ''}
         />

         <div className="myaccount">
            <div className="content">
               <div className="head">
                  <h3>
                     {user && user.firstName} {user && user.lastName}
                  </h3>
                  <h4>{user && user.email}</h4>
                  <h5>{user && user.phoneNumber}</h5>
                  <i
                     onClick={() => setOpenModal(true)}
                     className="fas fa-edit"
                  ></i>
               </div>

               {openModal && (
                  <EditDetailsModal
                     userObj={user && user}
                     closeModal={() => {
                        setOpenModal(false);
                        dispatch(clearErrors());
                     }}
                  />
               )}

               {loading && <Loader />}

               {msg && <Message msg={msg} variant="error" box />}

               <div className="main">
                  <h3>Orders</h3>

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
                              {/* <div>
                                 <h5>
                                    <Moment format="DD MMM YYYY">
                                       {order.createdAt}
                                    </Moment>
                                 </h5>
                              </div> */}
                              {/* <div>
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
                              </div> */}
                           </div>
                        </Link>
                     ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default MyAccountPage;
