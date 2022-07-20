import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clearErrors } from '../actions/errorActions';
import { registerUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Showcase from '../components/Showcase';

const RegisterPage = () => {
   const params = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [showPassword, setshowPassword] = useState(false);
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [password, setPassword] = useState('');

   const registerState = useSelector((state) => state.register);
   const { loading, user } = registerState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      dispatch(clearErrors());
      const r = params.redirect ? params.redirect.split('=')[1] : '/';

      if (user) {
         navigate(`/${r}`);
      }
   }, [navigate, user, params, dispatch]);

   const togglePassword = () => {
      setshowPassword(!showPassword);
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      // Create userObject
      const user = {
         firstName,
         lastName,
         email,
         password,
         phoneNumber,
      };

      dispatch(registerUser(user));
   };

   return (
      <div className="registerpage">
         <Meta title="Ade Farm Snails | Register" />
         <Showcase
            title="Sign Up"
            img="https://res.cloudinary.com/the-tom-media/image/upload/v1658160593/adefarmsnails/5jxktkqTURBXy8zMWI5OWFkYTkyMzllZTg3Y2M3Zjk2Mzc5M2VhZjZhZC5qcGVnkpUDADzNBkDNA4STBc0EsM0Cdg_byvqvr.jpg"
         />

         <div className="register">
            <div className="content">
               <form onSubmit={handleSubmit}>
                  <div>
                     <label htmlFor="firstName">First Name</label>
                     <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        autoComplete="off"
                        id="firstName"
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
                        autoComplete="off"
                        id="email"
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

                  <div>
                     <button className="btn btn-primary">
                        {' '}
                        {loading ? <Loader /> : 'Create Account'}
                     </button>
                  </div>
                  <strong>
                     Already have an account?{' '}
                     <Link to="/login/redirect=/">Log In</Link>
                  </strong>
               </form>
            </div>
         </div>
      </div>
   );
};

export default RegisterPage;
