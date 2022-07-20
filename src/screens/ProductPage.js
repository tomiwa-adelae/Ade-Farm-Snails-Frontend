import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createProductReview, getProduct } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Showcase from '../components/Showcase';
import Review from '../components/Review';
import { clearErrors } from '../actions/errorActions';
import Meta from '../components/Meta';

const ProductPage = () => {
   const params = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [qty, setQty] = useState('1');
   const [rating, setRating] = useState('');
   const [comment, setComment] = useState('');

   const productState = useSelector((state) => state.product);
   const { loading, product, reviews } = productState;

   const reviewState = useSelector((state) => state.createReview);
   const { loadingReview, success, successMsg } = reviewState;

   const loginState = useSelector((state) => state.login);
   const { user } = loginState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      dispatch(getProduct(params.id));

      if (success) {
         dispatch(clearErrors());
         setComment('');
         setRating('');
      }
   }, [dispatch, params, success]);

   const addToCartHandler = () => {
      navigate(`/cart/${params.id}/qty=${qty}`);
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      const reviewObj = {
         comment,
         rating,
         firstName: user.firstName,
         lastName: user.lastName,
      };

      dispatch(createProductReview(params.id, reviewObj));
   };

   return (
      <div className="productpage">
         <Meta title="Ade Farm Snails | Product" />
         {loading && <Loader />}

         {msg && <Message msg={msg} variant="error" box />}

         {product && (
            <>
               <Showcase img={product.image} title={product.name} />
               <div className="product">
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
                     <div className="sq-box">
                        <div>
                           <p>Price:</p>
                           <span># {product.price}</span>
                        </div>
                        <div className="select-box">
                           <p>Qty: </p>
                           <aside className="select">
                              <select
                                 value={qty}
                                 onChange={(e) => setQty(e.target.value)}
                              >
                                 <option value="1">1</option>
                                 <option value="2">2</option>
                                 <option value="3">3</option>
                                 <option value="4">4</option>
                                 <option value="5">5</option>
                                 <option value="6">6</option>
                                 <option value="7">7</option>
                                 <option value="7">8</option>
                                 <option value="9">9</option>
                                 <option value="10">10</option>
                              </select>
                              <i className="fas fa-caret-down"></i>
                           </aside>
                        </div>
                        <div className="button">
                           <button
                              onClick={addToCartHandler}
                              className="btn btn-primary"
                           >
                              Add to Cart
                           </button>
                        </div>
                     </div>
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
                        <div className="comment">
                           <h3>Write a customer review</h3>
                           {user ? (
                              <form onSubmit={handleSubmit}>
                                 <div>
                                    <label htmlFor="rating">Rating</label>
                                    <div className="select">
                                       <select
                                          value={rating}
                                          onChange={(e) =>
                                             setRating(e.target.value)
                                          }
                                          name="rating"
                                          id="rating"
                                       >
                                          <option value="">Select...</option>
                                          <option value="1">1 - Poor</option>
                                          <option value="2">2 - Fair</option>
                                          <option value="3">3 - Good</option>
                                          <option value="4">
                                             4 - Very Good
                                          </option>
                                          <option value="5">
                                             5 - Excellent
                                          </option>
                                       </select>
                                       <i className="fas fa-caret-down"></i>
                                    </div>
                                 </div>
                                 <div>
                                    <label htmlFor="comment">Comment</label>
                                    <textarea
                                       name="comment"
                                       id="comment"
                                       cols="30"
                                       rows="10"
                                       autoComplete="off"
                                       value={comment}
                                       onChange={(e) =>
                                          setComment(e.target.value)
                                       }
                                    ></textarea>
                                 </div>

                                 {msg && (
                                    <Message msg={msg} variant="error" box />
                                 )}

                                 {successMsg && (
                                    <Message
                                       msg={successMsg}
                                       variant="success"
                                       box
                                    />
                                 )}

                                 <div>
                                    <button className="btn btn-primary">
                                       {loadingReview ? (
                                          <Loader />
                                       ) : (
                                          'Submit Review'
                                       )}
                                    </button>
                                 </div>
                              </form>
                           ) : (
                              <div className="error-message-box">
                                 <small>
                                    <i className="fas fa-exclamation-circle"></i>{' '}
                                    Please{' '}
                                    <Link to="/login/redirect=/">sign in </Link>{' '}
                                    to write a review
                                 </small>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </>
         )}
      </div>
   );
};

export default ProductPage;
