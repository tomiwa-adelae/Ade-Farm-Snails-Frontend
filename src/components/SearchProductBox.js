import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSearchProductBox = () => {
   const [keyword, setKeyword] = useState('');

   const navigate = useNavigate();

   const onSubmit = (e) => {
      e.preventDefault();

      if (keyword.trim()) {
         navigate(`/admin/search/products/${keyword}`);
      } else {
         navigate('/all-products');
      }
   };

   return (
      <div className="searchbox">
         <form onSubmit={onSubmit}>
            <div>
               <input
                  type="text"
                  name="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search for Products..."
                  autoComplete="off"
               />
               {keyword.length === 0 ? (
                  <i onClick={onSubmit} className="fas fa-search"></i>
               ) : (
                  <i
                     onClick={() => {
                        setKeyword('');
                        navigate('/all-products');
                     }}
                     className="fas"
                  >
                     <h4 style={{ fontSize: '2rem' }}>&times;</h4>
                  </i>
               )}
            </div>
         </form>
      </div>
   );
};

export default AdminSearchProductBox;
