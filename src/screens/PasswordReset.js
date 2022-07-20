import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors } from '../actions/errorActions';
import { resetPassword } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

import Showcase from '../components/Showcase';
import NotFoundPage from '../screens/NotFoundPage';
import Meta from '../components/Meta';

const PasswordReset = () => {
   const params = useParams();
   const dispatch = useDispatch();

   const url = `https://adefarmsnails.herokuapp.com/api/password-reset/${params.id}/${params.token}`;

   const [validUrl, setValidUrl] = useState(true);
   const [password, setPassword] = useState('');
   const [showPassword, setshowPassword] = useState(false);

   const resetPasswordState = useSelector((state) => state.resetPassword);
   const { loading, successMsg } = resetPasswordState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   const togglePassword = () => {
      setshowPassword(!showPassword);
   };

   useEffect(() => {
      dispatch(clearErrors());
      const verifyUrl = async () => {
         try {
            await axios.get(url);
            setValidUrl(true);
         } catch (error) {
            setValidUrl(false);
         }
      };

      if (successMsg) {
         dispatch(clearErrors());
      }

      verifyUrl();
   }, [params, url, dispatch, successMsg]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      const passwordObj = {
         password,
      };

      dispatch(resetPassword(url, passwordObj));
   };

   return validUrl ? (
      <div className="passwordresetpage">
         <Meta title="Ade Farm Snails | Password Reset" />
         <Showcase
            img="https://res.cloudinary.com/the-tom-media/image/upload/v1658160593/adefarmsnails/5jxktkqTURBXy8zMWI5OWFkYTkyMzllZTg3Y2M3Zjk2Mzc5M2VhZjZhZC5qcGVnkpUDADzNBkDNA4STBc0EsM0Cdg_byvqvr.jpg"
            title="Reset Password"
         />

         <div className="passwordreset">
            <div className="content">
               <form onSubmit={handleSubmit}>
                  <div className="password">
                     <label htmlFor="password">New Password</label>
                     <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="off"
                     />
                     <i
                        onClick={togglePassword}
                        className={
                           showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                        }
                     ></i>
                  </div>
                  {msg && <Message msg={msg} variant="error" box />}
                  {successMsg && (
                     <Message msg={successMsg} variant="success" box />
                  )}

                  <div>
                     <button className="btn btn-primary">
                        {loading ? <Loader /> : 'Submit'}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   ) : (
      <NotFoundPage />
   );
};

export default PasswordReset;
