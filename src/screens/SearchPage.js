import React, { useEffect } from 'react';
import Showcase from '../components/Showcase';
import SearchBox from '../components/SearchBox';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../actions/errorActions';
import { getProducts } from '../actions/productActions';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import Meta from '../components/Meta';

const SearchPage = () => {
   const dispatch = useDispatch();
   const params = useParams();

   const productState = useSelector((state) => state.products);
   const { loading, products } = productState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      dispatch(clearErrors());
      dispatch(getProducts(params.keyword));
   }, [dispatch, params]);

   return (
      <div className="searchpage">
         <Meta title="Ade Farm Snails | Search" />
         <Showcase
            img="https://res.cloudinary.com/the-tom-media/image/upload/v1658160593/adefarmsnails/5jxktkqTURBXy8zMWI5OWFkYTkyMzllZTg3Y2M3Zjk2Mzc5M2VhZjZhZC5qcGVnkpUDADzNBkDNA4STBc0EsM0Cdg_byvqvr.jpg"
            title="Search Products"
         />

         <div className="search">
            <div className="content">
               <SearchBox />

               {loading && <Loader />}

               {msg && <Message msg={msg} variant="error" box />}

               <div className="products-container">
                  {products &&
                     products.map((product) => (
                        <Product key={product._id} product={product} />
                     ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default SearchPage;
