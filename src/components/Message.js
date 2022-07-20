import React from 'react';

const Message = ({ msg, variant, box }) => {
   return (
      <>
         {box ? (
            <div
               className={
                  variant === 'error'
                     ? 'error-message-box'
                     : 'success-message-box'
               }
            >
               <small>
                  {' '}
                  {variant === 'error' ? (
                     <i className="fas fa-exclamation-circle"></i>
                  ) : (
                     <i className="fas fa-check"></i>
                  )}{' '}
                  {msg}
               </small>
            </div>
         ) : (
            <div
               className={
                  variant === 'error' ? 'error-message' : 'success-message'
               }
            >
               <small>
                  {' '}
                  {variant === 'error' ? (
                     <i className="fas fa-exclamation-circle"></i>
                  ) : (
                     <i className="fas fa-check"></i>
                  )}{' '}
                  {msg}
               </small>
            </div>
         )}
      </>
   );
};

export default Message;
