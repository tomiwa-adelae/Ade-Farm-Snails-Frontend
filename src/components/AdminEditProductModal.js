import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { getProduct, updateProduct } from '../actions/productActions';
import { clearErrors } from '../actions/errorActions';

const AdminEditProductModal = ({ closeModal, product }) => {
   const dispatch = useDispatch();

   const [name, setName] = useState(product.name);
   const [description, setDescription] = useState(product.description);
   const [price, setPrice] = useState(product.price);
   const [image, setImage] = useState(product.image);
   const [loadingUpload, setLoadingUpload] = useState(false);
   const [public_id, setPublic_id] = useState(product.imagePublicId);
   const [previewSource, setPreviewSource] = useState(product.image);
   const [error, setError] = useState('');

   const updateProductState = useSelector((state) => state.updateProduct);
   const { loading, success } = updateProductState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      if (success) {
         closeModal();

         dispatch(getProduct(product._id));
         dispatch(clearErrors());
      }
   }, [success, closeModal, dispatch, product]);

   const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
         const reader = new FileReader();

         reader.readAsDataURL(file);

         reader.onabort = () => console.log('file reading was aborted');
         reader.onerror = () => console.log('file reading has failed');
         reader.onload = () => {
            // Do whatever you want with the file contents
            const binaryStr = reader.result;

            const uploadObj = {
               data: binaryStr,
            };

            setLoadingUpload(true);
            setPublic_id('');
            setPreviewSource('');
            setImage('');
            axios
               .post('/api/uploads', uploadObj)
               .then((res) => {
                  setImage(res.data.url);
                  setPublic_id(res.data.public_id);
                  setLoadingUpload(false);

                  setPreviewSource(binaryStr);

                  setError('');
               })
               .catch((err) => {
                  setLoadingUpload(false);
                  setError(err.response.data.msg);
               });
         };
      });
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();

      const updatedProduct = {
         name,
         price,
         description,
         image,
         imagePublicId: public_id,
         id: product._id,
      };

      dispatch(updateProduct(updatedProduct));
   };

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
   });

   return (
      <div className="adminupdateproductmodal modal">
         <div className="modal-content">
            <form onSubmit={handleSubmit}>
               <div>
                  <label htmlFor="name">Name</label>
                  <input
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     type="text"
                     autoComplete="off"
                     id="name"
                  />
               </div>
               <div>
                  <label htmlFor="price">Price</label>
                  <input
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                     type="text"
                     id="price"
                     autoComplete="off"
                  />
               </div>
               <div>
                  <label htmlFor="description">Description</label>
                  <textarea
                     name="description"
                     id="description"
                     autoComplete="off"
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
               </div>
            </form>
            <form {...getRootProps()}>
               <div className={isDragActive ? 'modal-active' : 'upload-modal'}>
                  <input {...getInputProps()} />

                  {loadingUpload ? (
                     <Loader />
                  ) : error ? (
                     <Message msg={error} variant="error" />
                  ) : (
                     <small>Drap and drop or browse to choose a file</small>
                  )}
               </div>

               <div className="preview-file">
                  {previewSource && (
                     <div>
                        <img src={previewSource} alt="" />
                     </div>
                  )}
               </div>
            </form>
            {msg && <Message msg={msg} variant="error" box />}

            <div className="buttons">
               <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-white"
                  disabled={!image}
               >
                  {' '}
                  {loading ? <Loader /> : 'Update Product'}
               </button>
               <div onClick={closeModal} className="btn btn-white">
                  Close Modal
               </div>
            </div>
         </div>
      </div>
   );
};

export default AdminEditProductModal;
