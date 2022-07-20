import React from 'react';

const SocialMedia = () => {
   return (
      <div className="socialmedia">
         <h3>Join us on Social Media</h3>

         <div className="icons">
            <a
               href="https://web.facebook.com/ADE-FARM-Snails-104722844802818/sss"
               target="_blank"
               rel="noopener noreferrer"
            >
               <i className="fab fa-facebook"></i>
            </a>
            <a
               href="https://twitter.com/ade_farm"
               target="_blank"
               rel="noopener noreferrer"
            >
               <i className="fab fa-twitter"></i>
            </a>
            <a
               href="https://www.instagram.com/adefarmsnail/"
               target="_blank"
               rel="noopener noreferrer"
            >
               <i className="fab fa-instagram"></i>
            </a>
         </div>
      </div>
   );
};

export default SocialMedia;
