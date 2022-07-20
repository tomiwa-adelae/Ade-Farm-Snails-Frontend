import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Showcase from '../components/Showcase';
import Review from '../components/Review';
import AdminDeleteProductModal from '../components/AdminDeleteProductModal';
import AdminEditProductModal from '../components/AdminEditProductModal';
import Meta from '../components/Meta';

const AdminProductPage = () => {
   const params = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [openModal, setOpenModal] = useState(false);
   const [openEditModal, setOpenEditModal] = useState(false);

   const productState = useSelector((state) => state.product);
   const { loading, product, reviews } = productState;

   const loginState = useSelector((state) => state.login);
   const { user } = loginState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      if (!user || !user.isAdmin) {
         return navigate('/login/redirect=/');
      }

      dispatch(getProduct(params.id));
   }, [dispatch, params, user, navigate]);

   return (
      <div className="adminproductpage">
         <Meta title="Ade Farm Snails | Admin Product" />
         {loading && <Loader />}

         {msg && <Message msg={msg} variant="error" box />}

         {product && (
            <>
               <Showcase img={product.image} title={product.name} />
               <div className="adminproduct">
                  <div className="content">
                     <div className="main">
                        <div className="img">
                           <img src={product.image} alt={product.name} />
                        </div>
                        <div className="details">
                           <h3>{product.name}</h3>
                           <h4># {product.price}</h4>
                           <p>{product.description}</p>
                        </div>
                     </div>
                     <div className="admin-buttons">
                        <button
                           onClick={() => setOpenEditModal(true)}
                           className="btn btn-primary"
                        >
                           <i className="fas fa-edit"></i> Edit Product
                        </button>
                        <button
                           onClick={() => setOpenModal(true)}
                           className="btn btn-danger"
                        >
                           <i className="fas fa-trash"></i> Delete Product
                        </button>
                     </div>

                     {openModal && (
                        <AdminDeleteProductModal
                           closeModal={() => setOpenModal(false)}
                           id={product._id}
                           publicId={product.imagePublicId}
                        />
                     )}

                     {openEditModal && (
                        <AdminEditProductModal
                           closeModal={() => setOpenEditModal(false)}
                           product={product}
                        />
                     )}
                  </div>
                  <div className="content">
                     <div className="review-section">
                        <h3>Reviews</h3>
                        {reviews.length === 0 && (
                           <Message msg="No Reviews" variant="success" box />
                        )}
                        <div className="reviews">
                           {reviews.map((review) => (
                              <Review key={review._id} review={review} />
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </>
         )}
      </div>
   );
};

export default AdminProductPage;
