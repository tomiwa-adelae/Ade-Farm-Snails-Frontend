import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProductAction } from '../actions/productActions';
import Loader from './Loader';
import { clearErrors } from '../actions/errorActions';

const AdminDeleteProductModal = ({ closeModal, id, publicId }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const deleteProductState = useSelector((state) => state.deleteProduct);
   const { success, loading } = deleteProductState;

   useEffect(() => {
      if (success) {
         closeModal();
         navigate('/all-products');
      }
   }, [success, closeModal, navigate]);

   const deleteProductHandler = () => {
      dispatch(deleteProductAction(id, publicId));
   };

   return (
      <div className="modal">
         <div className="modal-content delete">
            <div className="head">
               <h3>Are you sure?</h3>
            </div>
            <div className="button">
               <button onClick={deleteProductHandler} className="btn btn-white">
                  {loading ? <Loader /> : 'Yes'}
               </button>
               <button
                  onClick={() => {
                     closeModal();
                     dispatch(clearErrors());
                  }}
                  className="btn btn-white"
               >
                  No
               </button>
            </div>
         </div>
      </div>
   );
};

export default AdminDeleteProductModal;
