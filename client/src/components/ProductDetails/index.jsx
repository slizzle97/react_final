import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.css'
import { Rating } from '@mui/material';
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({})
  const [activeImage, setActiveImage] = useState(product.thumbnail)
const navigate = useNavigate()
  useEffect(() => {
    getSingleProduct()
  }, [])


  const getSingleProduct = async () => {
    try {
        const url = `http://localhost:3001/products/${id}`;

        const data = await axios.get(url);
        setProduct(data.data)
        setActiveImage(data.data.thumbnail)

    }catch (e) {
        console.log(e);
    }
}
const handleGoBack = () => {
  navigate(-1);
};

    return (
      <div className={styles.product_item}>
        <div className={styles.back_btn} onClick={handleGoBack}>
        <i className='bi bi-chevron-left'></i>

        </div>
        <div className={styles.image_container}>
        <img src={activeImage} alt={product.title} className={styles.thumbnail} />
        <div className={styles.secondary_image_container}>
            {product.images?.map((img, index) => (
                <img onClick={() =>setActiveImage(img)} className={styles.secondary_image} src={img} alt='secondary_img' key={index} />
            ))}
        </div>
        
        </div>
        <div className={styles.product_details}>
          <h2>{product.brand} {product.title}</h2>
          <p>{product.description}</p>
          <p>
            <strong>Price:</strong> ${product.price} ({product.discountPercentage}% off)
          </p>
          <p className={styles.rate}>
            <strong>Rating:</strong> <span className={styles.rate}>
                {product.rating}

                </span>
                <Rating name="half-rating" value={product.rating} readOnly precision={0.5} />
          </p>


          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
        </div>
     
      </div>
    )
};

export default ProductDetails;
