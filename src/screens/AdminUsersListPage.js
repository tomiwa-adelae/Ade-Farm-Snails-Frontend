import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Showcase from '../components/Showcase';
import { getUsers } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AdminCreateUserModal from '../components/AdminCreateUserModal';
import { clearErrors } from '../actions/errorActions';
import AdminSearchUserBox from '../components/SearchUserBox';
import Meta from '../components/Meta';

const AdminUserListPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const params = useParams();

   const [openUserModal, setOpenUserModal] = useState(false);

   const loginState = useSelector((state) => state.login);
   const { user } = loginState;

   const listState = useSelector((state) => state.userList);
   const { loading, users } = listState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      dispatch(clearErrors());
      if (!user || !user.isAdmin) {
         return navigate('/login/redirect=/');
      }

      dispatch(getUsers(params.keyword));
   }, [navigate, user, dispatch, params]);

   return (
      <div className="adminuserlistpage">
         <Meta title="Ade Farm Snails | Admin Users" />
         <Showcase
            img="https://res.cloudinary.com/the-tom-media/image/upload/v1658160593/adefarmsnails/5jxktkqTURBXy8zMWI5OWFkYTkyMzllZTg3Y2M3Zjk2Mzc5M2VhZjZhZC5qcGVnkpUDADzNBkDNA4STBc0EsM0Cdg_byvqvr.jpg"
            title="All Users"
         />

         <div className="adminuserlist">
            <div className="content">
               <div className="main">
                  <div className="head">
                     <h3>All Users</h3>

                     <div onClick={() => setOpenUserModal(true)}>
                        <i className="fas fa-plus"></i> Create new User{' '}
                     </div>
                  </div>
                  <AdminSearchUserBox />

                  {loading && <Loader />}

                  {msg && <Message msg={msg} variant="error" box />}

                  {users && users.length === 0 && (
                     <Message msg="You have no Users!" variant="success" box />
                  )}

                  {users &&
                     users.map((user) => (
                        <Link key={user._id} to={`/user/${user._id}`}>
                           <div className="item-box">
                              <div className="name">
                                 <h5>
                                    {user.firstName} {user.lastName}
                                 </h5>
                              </div>
                              <div>
                                 <h5>{user.email}</h5>
                              </div>
                              <div>
                                 {user.isAdmin ? (
                                    <h5>
                                       <i className="fas fa-check text-success"></i>
                                       Admin
                                    </h5>
                                 ) : (
                                    <h5>
                                       <i className="fas fa-exclamation-circle text-danger"></i>
                                       Not admin
                                    </h5>
                                 )}
                              </div>
                           </div>
                        </Link>
                     ))}
               </div>

               {openUserModal && (
                  <AdminCreateUserModal
                     closeModal={() => {
                        setOpenUserModal(false);
                        dispatch(clearErrors());
                     }}
                  />
               )}
            </div>
         </div>
      </div>
   );
};

export default AdminUserListPage;
