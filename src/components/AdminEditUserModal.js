import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminUpdateUser } from '../actions/userActions';
import Loader from './Loader';
import Message from './Message';

const AdminEditUserModal = ({ userObj, closeModal }) => {
   const dispatch = useDispatch();

   const [firstName, setFirstName] = useState(userObj.firstName);
   const [lastName, setLastName] = useState(userObj.lastName);
   const [phoneNumber, setPhoneNumber] = useState(userObj.phoneNumber);
   const [isAdmin, setIsAdmin] = useState(userObj.isAdmin);

   const adminUpdateUserState = useSelector((state) => state.adminUpdateUser);
   const { loading, success } = adminUpdateUserState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      if (success) {
         closeModal();
         window.location.reload();
      }
   }, [success, closeModal]);

   const handleSubmit = (e) => {
      e.preventDefault();

      const user = {
         firstName,
         lastName,
         isAdmin,
         phoneNumber,
         id: userObj._id,
      };

      dispatch(adminUpdateUser(user));
   };

   return (
      <div className="admineditusermodal modal">
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
                     autoComplete="off"
                     id="lastName"
                  />
               </div>
               <div>
                  <label htmlFor="number">Phone Number</label>
                  <input
                     value={phoneNumber}
                     onChange={(e) => setPhoneNumber(e.target.value)}
                     type="text"
                     autoComplete="off"
                     id="number"
                  />
               </div>
               <div className="checkbox">
                  <input
                     value={isAdmin}
                     onChange={(e) => setIsAdmin(!isAdmin)}
                     checked={isAdmin}
                     type="checkbox"
                     name="isAdmin"
                     autoComplete="off"
                     id="isAdmin"
                  />
                  <label htmlFor="isAdmin">Is Admin</label>
               </div>
               {msg && <Message msg={msg} variant="error" box />}

               <div className="buttons">
                  <button className="btn btn-white">
                     {' '}
                     {loading ? <Loader /> : 'Update user'}
                  </button>
                  <button
                     onClick={() => {
                        closeModal();
                        dispatch(clearErrors());
                     }}
                     className="btn btn-white"
                  >
                     Close Modal
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default AdminEditUserModal;
