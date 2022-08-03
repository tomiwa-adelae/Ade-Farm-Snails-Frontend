import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { clearErrors } from '../actions/errorActions';
import {
   adminCreateUser,
   getRecentUsers,
   getUsers,
} from '../actions/userActions';

const AdminCreateUserModal = ({ closeModal }) => {
   const dispatch = useDispatch();

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setshowPassword] = useState(false);

   const createUserState = useSelector((state) => state.createUser);
   const { loading, success } = createUserState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      if (success) {
         closeModal();

         dispatch(getRecentUsers());
         dispatch(getUsers());
         dispatch(clearErrors());
      }
   }, [success, closeModal, dispatch]);

   const togglePassword = () => {
      setshowPassword(!showPassword);
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      const user = {
         firstName,
         lastName,
         email,
         phoneNumber,
         password,
      };

      dispatch(adminCreateUser(user));
   };

   return (
      <div className="admincreateproductmodal modal">
         <div className="modal-content">
            <form onSubmit={handleSubmit}>
               <div>
                  <label htmlFor="firstName">First Name</label>
                  <input
                     value={firstName}
                     onChange={(e) => setFirstName(e.target.value)}
                     type="text"
                     id="firstName"
                     autoComplete="off"
                  />
               </div>
               <div>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                     value={lastName}
                     onChange={(e) => setLastName(e.target.value)}
                     type="text"
                     id="lastName"
                     autoComplete="off"
                  />
               </div>
               <div>
                  <label htmlFor="email">Email Address</label>
                  <input
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     type="email"
                     id="email"
                     autoComplete="off"
                  />
               </div>
               <div>
                  <label htmlFor="number">Phone Number</label>
                  <input
                     value={phoneNumber}
                     onChange={(e) => setPhoneNumber(e.target.value)}
                     type="text"
                     id="number"
                     autoComplete="off"
                  />
               </div>
               <div className="password">
                  <label htmlFor="password">Password</label>
                  <input
                     type={showPassword ? 'text' : 'password'}
                     id="password"
                     value={password}
                     autoComplete="off"
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  <i
                     onClick={togglePassword}
                     className={
                        showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                     }
                  ></i>
               </div>

               {msg && <Message msg={msg} variant="error" box />}

               <div className="buttons">
                  <button
                     type="submit"
                     onClick={handleSubmit}
                     className="btn btn-white"
                     style={{ width: 'inherit' }}
                  >
                     {' '}
                     {loading ? <Loader /> : 'Create User'}
                  </button>
                  <div
                     style={{ width: 'inherit' }}
                     onClick={() => {
                        closeModal();
                        dispatch(clearErrors());
                     }}
                     className="btn btn-white"
                  >
                     Close Modal
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
};

export default AdminCreateUserModal;
