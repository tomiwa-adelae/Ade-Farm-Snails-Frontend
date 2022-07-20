import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Rating from './Rating';
import { Image, Transformation } from 'cloudinary-react';

const Product = ({ product }) => {
   const navigate = useNavigate();

   const addToCartHandler = (id) => {
      navigate(`/cart/${id}/qty=1`);
   };
   return (
      <div className="product">
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
         <div className="detail">
            <Link to={`/product/${product._id}`}>
               <h4>{product.name}</h4>
            </Link>
            <h5># {product.price}</h5>
         </div>
         <Rating
            rating={product.rating}
            numReviews={`${product.numReviews} reviews`}
         />
         <div onClick={() => addToCartHandler(product._id)} className="button">
            <button className="btn btn-primary">Add to Cart</button>
         </div>
      </div>
   );
};

export default Product;
