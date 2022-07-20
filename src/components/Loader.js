import React from 'react';

const Loader = ({ small }) => {
   return (
      <div className="spinner-wraaper">
         <div className={small ? 'spinner-small' : 'spinner'}></div>
      </div>
   );
};

export default Loader;
