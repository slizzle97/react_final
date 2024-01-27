import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import React, { useEffect, useState } from 'react';
import { Rating } from "@mui/material";

const Product = (props) => {
    const { product, data } = props;

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
            <Link to={{pathname: `/products/${product.id}`, search: `${product.category}` }} state={data} className={styles.link}>

                <img className={styles.thumbnail} src={product.thumbnail} alt="thumbnail" />
                <div className={styles.content_container}>
                <h1 className={styles.title}>{generateName()}</h1>
                <p className={styles.description}>{product.description}</p>
                <span className={styles.rate}>
                {product.rating}
                <Rating name="half-rating"  readOnly value={product.rating} precision={0.5} />

                </span>

                <p className={styles.price}>{product.price+ '$'}</p>
                </div>

            </Link>
            </div>
		</div>
	);
};

export default Product;
