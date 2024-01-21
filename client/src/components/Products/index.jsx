
import styles from "./styles.module.css";
import  {useEffect, useState } from "react";
import Product from "../Product";
import {Pagination, Stack} from '@mui/material'
const Products = ({filteredData}) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const handleChange = (event, value) => {
      setCurrentPage(value);
        
    };

    const itemsPerPage = 8;
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
	return (
	    <div className={styles.main_container}>
      <div className={styles.cards_container}>
        {/* Display products for the current page */}
        {filteredData.slice(startIndex, endIndex).map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>

<div className={styles.paging}>

      <Stack spacing={2}>
        <Pagination count={pageCount} page={currentPage} onChange={handleChange} />
      </Stack>
</div>
    </div>

	);
};

export default Products;
