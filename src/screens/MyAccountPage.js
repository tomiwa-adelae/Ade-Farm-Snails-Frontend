import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   // Link,
   useNavigate,
} from 'react-router-dom';
// import Moment from 'react-moment';
// import Showcase from '../components/Showcase';
// import { logoutUser } from '../actions/userActions';
import { getMyRecentOrders } from '../actions/orderActions';
// import Loader from '../components/Loader';
// import Message from '../components/Message';
// import EditDetailsModal from '../components/EditDetailsModal';
// import ChangePasswordModal from '../components/ChangePasswordModal';
import { clearErrors } from '../actions/errorActions';
// import Meta from '../components/Meta';

const MyAccountPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   // const [openModal, setOpenModal] = useState(false);
   // const [openPasswordModal, setOpenPasswordModal] = useState(false);

   const loginState = useSelector((state) => state.login);
   const { user } = loginState;

   // const myRecentOrderState = useSelector((state) => state.myRecentOrders);
   // const { loading, orders } = myRecentOrderState;

   // const errorState = useSelector((state) => state.error);
   // const { msg } = errorState;

   useEffect(() => {
      dispatch(clearErrors());
      if (!user) {
         return navigate('/login/redirect=/');
      }

      dispatch(getMyRecentOrders());
   }, [navigate, user, dispatch]);

   return <h1>Account Page</h1>;
};

export default MyAccountPage;
