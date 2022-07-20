import React from 'react';
import Meta from '../components/Meta';
import Showcase from '../components/Showcase';

const ContactPage = () => {
   return (
      <div className="contactpage">
         <Meta title="Ade Farm Snails | Contact Us" />
         <Showcase
            img="https://res.cloudinary.com/the-tom-media/image/upload/v1658160593/adefarmsnails/5jxktkqTURBXy8zMWI5OWFkYTkyMzllZTg3Y2M3Zjk2Mzc5M2VhZjZhZC5qcGVnkpUDADzNBkDNA4STBc0EsM0Cdg_byvqvr.jpg"
            title="Contact Us"
         />
         <div className="contact">
            <div className="content">
               <div className="contact">
                  <h4>
                     {' '}
                     Do you need as many snails as possible for a particular
                     occasion? If you are having difficulty placing your order,
                     please contact us at the following number.
                  </h4>
                  <h3>+(234) 9098 870-9973</h3>
                  <p>OR</p>
                  <h3>Email us @ support@adefarmsnail.com.ng</h3>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ContactPage;
