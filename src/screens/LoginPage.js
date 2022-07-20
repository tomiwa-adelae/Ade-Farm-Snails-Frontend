import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { loginUser } from '../actions/userActions';
import Showcase from '../components/Showcase';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { clearErrors } from '../actions/errorActions';
import Meta from '../components/Meta';

const LoginPage = () => {
   const params = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [showPassword, setshowPassword] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const loginState = useSelector((state) => state.login);
   const { loading, user } = loginState;

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
         email,
         password,
      };

      dispatch(loginUser(user));
   };

   return (
      <div className="loginpage">
         <Meta title="Ade Farm Snails | Login" />
         <Showcase
            title="Log In"
            img="https://res.cloudinary.com/the-tom-media/image/upload/v1658160593/adefarmsnails/5jxktkqTURBXy8zMWI5OWFkYTkyMzllZTg3Y2M3Zjk2Mzc5M2VhZjZhZC5qcGVnkpUDADzNBkDNA4STBc0EsM0Cdg_byvqvr.jpg"
         />

         <div className="login">
            <div className="content">
               <form onSubmit={handleSubmit}>
                  <div>
                     <label htmlFor="email">Email Address</label>
                     <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        id="email"
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
                        {loading ? <Loader /> : 'Log In'}
                     </button>
                  </div>

                  <strong>
                     Don't have an account?{' '}
                     <Link to={'/register/redirect=/'}>Regiser Now</Link>
                  </strong>
               </form>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
