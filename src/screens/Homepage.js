import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Typical from 'react-typical';
import { Image, Transformation } from 'cloudinary-react';
import { getRecentProducts } from '../actions/productActions';
import OurFarm from '../components/OurFarm';
import SocialMedia from '../components/SocialMedia';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { clearErrors } from '../actions/errorActions';
import Meta from '../components/Meta';

const Homepage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const recentProductState = useSelector((state) => state.recentProducts);
   const { loading, products } = recentProductState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      dispatch(clearErrors());
      dispatch(getRecentProducts());
   }, [dispatch]);

   const addToCartHandler = (id) => {
      navigate(`/cart/${id}/qty=1`);
   };

   return (
      <div className="homepage">
         <Meta title="Ade Farm Snails" />
         <div className="showcase-home">
            <img
               src="https://res.cloudinary.com/the-tom-media/image/upload/v1658160593/adefarmsnails/5jxktkqTURBXy8zMWI5OWFkYTkyMzllZTg3Y2M3Zjk2Mzc5M2VhZjZhZC5qcGVnkpUDADzNBkDNA4STBc0EsM0Cdg_byvqvr.jpg"
               alt="Snails"
            />
            <div className="intro">
               <h1>
                  Snails for{' '}
                  <span>
                     <Typical
                        steps={[
                           'Pleasure',
                           2000,
                           'Satisfaction',
                           3000,
                           'Relaxation',
                           4000,
                           'Enjoyment',
                           5000,
                        ]}
                        loop={Infinity}
                        wrapper="b"
                     />
                  </span>
               </h1>
               <Link to="/products">
                  <button className="btn btn-primary">Order Now</button>
               </Link>
            </div>
         </div>

         {/* Products */}
         {loading && <Loader />}

         {products && products.length === 0 && (
            <Message msg="There is no products!" variant="success" box />
         )}

         {msg && <Message msg={msg} variant="error" box />}

         <div className="products">
            {products &&
               products.map((product) => (
                  <div key={product._id} className="product">
                     <Link to={`/product/${product._id}`}>
                        <div className="img">
                           <Image
                              cloudName="the-tom-media"
                              publicId={product.imagePublicId}
                           >
                              <Transformation />
                           </Image>
                        </div>
                     </Link>
                     <div className="content">
                        <Link to={`/product/${product._id}`}>
                           {' '}
                           <h3>{product.name}</h3>{' '}
                        </Link>
                        <h4># {product.price}</h4>
                        <p>{product.description}</p>
                        <button
                           onClick={() => addToCartHandler(product._id)}
                           className="btn btn-primary"
                        >
                           Add to Cart
                        </button>
                     </div>
                  </div>
               ))}
         </div>

         {/* Our Farm */}
         <OurFarm />

         {/* Social Media */}
         <SocialMedia />
      </div>
   );
};

export default Homepage;
