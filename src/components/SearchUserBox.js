import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSearchUserBox = () => {
   const [keyword, setKeyword] = useState('');

   const navigate = useNavigate();

   const onSubmit = (e) => {
      e.preventDefault();

      if (keyword.trim()) {
         navigate(`/admin/search/users/${keyword}`);
      } else {
         navigate('/all-users');
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
                  autoComplete="off"
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search for Users..."
               />
               {keyword.length === 0 ? (
                  <i onClick={onSubmit} className="fas fa-search"></i>
               ) : (
                  <i
                     onClick={() => {
                        setKeyword('');
                        navigate('/all-users');
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

export default AdminSearchUserBox;
