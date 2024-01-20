import axios from "axios";
import styles from "./styles.module.css";
import  {useEffect, useState } from "react";
import Product from "../Product";

const Products = ({setData, filteredData, data}) => {

    useEffect(() => {
        console.log(filteredData);
    }, [filteredData])
    
	return (
		<div className={styles.main_container}>
            <div className={styles.cards_container}>
            
              {filteredData.length === 0
    ? data.map((product, index) => (
        <Product key={index} product={product} />
      ))
    : filteredData.map((product, index) => (
        <Product key={index} product={product} />
      ))}
		</div>

		</div>
	);
};

export default Products;
