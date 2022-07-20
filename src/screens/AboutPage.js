import React from 'react';
import { Link } from 'react-router-dom';
import Showcase from '../components/Showcase';
import Meta from '../components/Meta';

const AboutPage = () => {
   return (
      <div className="aboutpage">
         <Meta title="Ade Farm Snails | About" />
         <Showcase
            img="https://res.cloudinary.com/the-tom-media/image/upload/v1658160593/adefarmsnails/5jxktkqTURBXy8zMWI5OWFkYTkyMzllZTg3Y2M3Zjk2Mzc5M2VhZjZhZC5qcGVnkpUDADzNBkDNA4STBc0EsM0Cdg_byvqvr.jpg"
            title="About Us"
         />
         <div className="about">
            <div className="content">
               <div className="about">
                  <h3>About</h3>
                  <p>
                     Located in Oyo State, Nigeria, Ade Farm Snail is one of the
                     largest snail company in the whole of West Africa. Our
                     breeding of snails is completely hygienic and safe for all.
                     We combine proven methods to snail farming and are able to
                     supply quality and healthy snails to organizations and
                     homes within and outside Nigeria.
                  </p>
                  <br />
                  <p>
                     We have a breeding capacity of one million snails per year
                     because of our large farms all over Oyo state. We are big
                     suppliers to larger enterprises in Europe, India and United
                     State of America. Is there a particular requirement for you
                     to get as many snails as possible? Now{' '}
                     <Link to="/contact">
                        <span>Contact us</span>
                     </Link>
                     . Our farms are located in Oyo State, Nigeria, in a variety
                     of locations.
                  </p>
               </div>
               <div className="ourproduct">
                  <h3>Our Products</h3>
                  <p>
                     We provide you with delicious snail meals such as Grilled
                     and Peppered Snail, Oven Dried Snail, Fresh Snail, Live
                     Snail. We are capable of delivering any amount of snails to
                     an individual or an organization.
                  </p>
               </div>
               <div className="farms">
                  <h3>Our Farms</h3>
                  <p>
                     Ade farm snails is a fully capable organization because we
                     are independent. This means that we do not rely on an
                     external source for our snails. From our farm, we produce
                     our snails. We have three big farms where we breed our
                     snails and grow them. For snail farming, we use proven
                     methods and we are able to produce quality, quantity and
                     healthy snails for that purpose.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AboutPage;
