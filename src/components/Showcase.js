import React from 'react';

const Showcase = ({ img, title }) => {
   return (
      <div className="showcase">
         <img src={img} alt={title} />
         <div className="intro">
            <h1>{title}</h1>
         </div>
      </div>
   );
};

export default Showcase;
