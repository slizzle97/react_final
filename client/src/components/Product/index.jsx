import styles from "./styles.module.css";
import React from 'react';

const Product = (props) => {
    const { product } = props;

    const generateName = () => {
        
          if (product.title.includes(product.brand)) {
            return product.title;
          } else {
            return `${product.brand} ${product.title}`;
          }
        };

        


	return (
		<div className={styles.card_container}>
			<div className={styles.card}>
                <img className={styles.thumbnail} src={product.thumbnail} alt="thumbnail" />
                <div className={styles.content_container}>
                <h1 className={styles.title}>{generateName()}</h1>
                <p className={styles.description}>{product.description}</p>
                <p className={styles.price}>{product.price+ '$'}</p>
                </div>
            </div>
		</div>
	);
};

export default Product;

// "id": 1,
// "title": "iPhone 9",
// "description": "An apple mobile which is nothing like apple",
// "price": 549,
// "discountPercentage": 12.96,
// "rating": 4.69,
// "stock": 94,
// "brand": "Apple",
// "category": "smartphones",
// "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
// "images": [
// "https://cdn.dummyjson.com/product-images/1/1.jpg",
// "https://cdn.dummyjson.com/product-images/1/2.jpg",
// "https://cdn.dummyjson.com/product-images/1/3.jpg",
// "https://cdn.dummyjson.com/product-images/1/4.jpg",
// "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
// ]
// },