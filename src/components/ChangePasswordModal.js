import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../actions/errorActions';
import { updateUser } from '../actions/userActions';
import Loader from './Loader';
import Message from './Message';

const ChangePasswordModal = ({ closeModal }) => {
   const dispatch = useDispatch();

   const [currentPassword, setCurrentPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [showPassword1, setShowPassword1] = useState('');
   const [showPassword2, setShowPassword2] = useState('');
   const [showPassword3, setShowPassword3] = useState('');
   const [successMsg, setSuccessMsg] = useState('');

   const updateUserState = useSelector((state) => state.updateUser);
   const { loading, success } = updateUserState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      if (success) {
         setSuccessMsg('Password changed successfully! Close Modal');
         dispatch(clearErrors());
      }
   }, [success, dispatch]);

   const handleSubmit = (e) => {
      e.preventDefault();

      const user = {
         currentPassword,
         newPassword,
         confirmPassword,
      };

      dispatch(updateUser(user));
   };

   return (
      <div className="changepasswordmodal modal">
         <div className="modal-content">
            <form onSubmit={handleSubmit}>
               <div className="password">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                     value={currentPassword}
                     onChange={(e) => setCurrentPassword(e.target.value)}
                     type={showPassword1 ? 'text' : 'password'}
                     id="currentPassword"
                     autoComplete="off"
                  />
                  <i
                     onClick={() => setShowPassword1(!showPassword1)}
                     className={
                        showPassword1 ? 'fas fa-eye-slash' : 'fas fa-eye'
                     }
                  ></i>
               </div>
               <div className="password">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                     value={newPassword}
                     onChange={(e) => setNewPassword(e.target.value)}
                     type={showPassword2 ? 'text' : 'password'}
                     id="newPassword"
                     autoComplete="off"
                  />
                  <i
                     onClick={() => setShowPassword2(!showPassword2)}
                     className={
                        showPassword2 ? 'fas fa-eye-slash' : 'fas fa-eye'
                     }
                  ></i>
               </div>
               <div className="password">
                  <label htmlFor="confirmPassword">Retype New Password</label>
                  <input
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     type={showPassword3 ? 'text' : 'password'}
                     id="confirmPassword"
                     autoComplete="off"
                  />
                  <i
                     onClick={() => setShowPassword3(!showPassword3)}
                     className={
                        showPassword3 ? 'fas fa-eye-slash' : 'fas fa-eye'
                     }
                  ></i>
               </div>
               {msg && <Message msg={msg} variant="error" box />}

               {successMsg && (
                  <Message msg={successMsg} variant="success" box />
               )}

               <div className="buttons">
                  <button className="btn btn-white">
                     {' '}
                     {loading ? <Loader /> : 'Update'}
                  </button>
                  <div
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

export default ChangePasswordModal;
