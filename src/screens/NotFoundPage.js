import React from 'react';
import { Link } from 'react-router-dom';
import Meta from '../components/Meta';
import Showcase from '../components/Showcase';

const NotFoundPage = () => {
   return (
      <div className="notfoundpage">
         <Meta title="Ade Farm Snails | 404 Not Found" />
         <Showcase
            img="https://res.cloudinary.com/the-tom-media/image/upload/v1658160593/adefarmsnails/5jxktkqTURBXy8zMWI5OWFkYTkyMzllZTg3Y2M3Zjk2Mzc5M2VhZjZhZC5qcGVnkpUDADzNBkDNA4STBc0EsM0Cdg_byvqvr.jpg"
            title="404 Page not Found"
         />
         <Link to="/">
            <div className="btn btn-primary">Go back Home</div>
         </Link>
      </div>
   );
};

export default NotFoundPage;
