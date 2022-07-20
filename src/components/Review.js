import React from 'react';
import Rating from './Rating';

const Review = ({ review }) => {
   return (
      <div className="review">
         <Rating rating={review.rating} />
         <p>{review.comment}</p>
         <div className="date">
            <small>{review.createdAt.substring(0, 10)}</small>
            <small className="name">by {review.name}</small>
         </div>
      </div>
   );
};

export default Review;
