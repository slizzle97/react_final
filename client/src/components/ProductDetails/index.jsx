import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.css'
import { Rating } from '@mui/material';
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({rating:0})
  const [activeImage, setActiveImage] = useState(product.thumbnail)
  const location = useLocation();
  const [sameCategoryData, setSameCategoryData] = useState([])
  const navigate = useNavigate()
  const inputRef = useRef(1);



  useEffect(() => {
    getSingleProduct()
  }, [])

  
  
  const filterForSingle = () => {
    
    let fData = location.state.filter(item => {
      return item.category === location.search.slice(1)
    })
    setSameCategoryData(fData)
  }
  


  const getSingleProduct = async (idFromSimilar) => {
    if(idFromSimilar) {
      navigate(`/products/${product.id}`)
    }
    try {
        const url = `http://localhost:3001/products/${idFromSimilar ? idFromSimilar : id}`;

        const data = await axios.get(url)
        setProduct(data.data)
        setActiveImage(data.data.thumbnail)
        filterForSingle()

    }catch (e) {
        console.log(e);
    }
}
    const handleGoBack = () => {
      navigate('/products');
    };
    const addToCart = () => {
      const productId = product.id; 
      const quantity = inputRef.current.value;

      const existingCart = JSON.parse(localStorage.getItem("cart")) || {};

      const updatedCart = {
        ...existingCart,
        [productId]: quantity
      };

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      

    } 

    return (
      <>
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
          <h2>{product.title?.includes(product.brand) ? product.title : product.brand + ' ' +product.title}</h2>
          <p>
            <strong>Price:</strong> ${product.price} ({product.discountPercentage}% off)
          </p>
          <p className={styles.rate}>
            <strong>Rating:</strong> <span className={styles.rate}>
                {product.rating}

                </span>
                <Rating name="half-rating" value={product?.rating} readOnly precision={0.5} />
          </p>


          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p className={styles.desc}>{product.description}</p>

          <div className={styles.add_cart}>
            <input type="number" name="" id="" defaultValue={1} ref={inputRef} />
            <i className='bi bi-plus' style={{ fontSize: '30px' }} onClick={addToCart}></i>
          </div>
        </div>
     
      </div>
      <h3 style={{ margin: '0 0 0 5%' }}
>Similar Items</h3>
      <div className={styles.similar_items}>
      {sameCategoryData?.map((item, index) => (
      <div className={styles.similar_item} onClick={() => getSingleProduct(item.id)} key={index} >

                <img className={styles.similar_item_img} src={item.thumbnail} alt='secondary_img' key={index} />
                <p className={styles.similar_item_title}>{item.title?.includes(item.brand) ? item.title : item.brand + ' ' +item.title}</p>

        </div>
            ))  }

      </div>
      </>
    )
};

export default ProductDetails;
