
import { useState } from 'react';
import styles from './styles.module.css'
const Sort = ({setFilteredData}) => {

    const handleSortChange = (e) => {
        
        if(e.target.value === 'price_up') {
            setFilteredData((data) =>data.slice().sort((a, b) => a.price - b.price))
            
        }else if(e.target.value === 'price_down') {
            setFilteredData((data) =>data.slice().sort((a, b) => b.price - a.price))
        }else if(e.target.value === 'rate') {
            setFilteredData((data) =>data.slice().sort((a, b) => b.rating - a.rating))

        }
        
      };

    return (
        <div>
            <select name="sort" 
        onChange={handleSortChange} className={styles.select} id="sort">

            <option  defaultValue=''>Sorting</option>
                <option value="price_up">Price Ascending</option>
                <option value="price_down">Price Descending</option>
                <option value="rate">Highest Rated</option>
            </select>
        </div>
    );

}

export default Sort;