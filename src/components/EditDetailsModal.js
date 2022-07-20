import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../actions/userActions';
import Loader from './Loader';
import Message from './Message';

const EditDetailsModal = ({ userObj, closeModal }) => {
   const dispatch = useDispatch();

   const [firstName, setFirstName] = useState(userObj.firstName);
   const [lastName, setLastName] = useState(userObj.lastName);
   const [phoneNumber, setPhoneNumber] = useState(userObj.phoneNumber);

   const updateUserState = useSelector((state) => state.updateUser);
   const { loading, success } = updateUserState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      if (success) closeModal();
   }, [success, closeModal]);

   const handleSubmit = (e) => {
      e.preventDefault();

      const user = {
         firstName,
         lastName,
         phoneNumber,
      };

      dispatch(updateUser(user));
   };

   return (
      <div className="editdetailsmodal modal">
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
                  <label htmlFor="number">Phone Number</label>
                  <input
                     value={phoneNumber}
                     onChange={(e) => setPhoneNumber(e.target.value)}
                     type="text"
                     id="number"
                     autoComplete="off"
                  />
               </div>
               {msg && <Message msg={msg} variant="error" box />}

               <div className="buttons">
                  <button className="btn btn-white">
                     {' '}
                     {loading ? <Loader /> : 'Update'}
                  </button>
                  <button onClick={closeModal} className="btn btn-white">
                     Close Modal
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default EditDetailsModal;
