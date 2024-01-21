import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css'
import { Slider } from '@mui/material';

const ProductFilter = ({ data, setFilteredData }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isRangeOpen, setIsRangeOpen] = useState(false);
  const [range, setRange] = useState([0, 5000]);
  const accordionRef = useRef(null);


  const handleClickOutside = (event) => {
    if (accordionRef.current && !accordionRef.current.contains(event.target)) {
      // Clicked outside of the accordion, close it
      setIsBrandOpen(false);
      setIsCategoryOpen(false);
      setIsRangeOpen(false);
    }
  }
  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  function handleChanges(event, newValue) {
     setRange(newValue);
     console.log(range);
  }
  const handleCheckboxChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((selectedBrand) => selectedBrand !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((selectedCategory) => selectedCategory !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }

  };
  useEffect(() => {
    const selectedBrandsCopy = [...selectedBrands];
    const selectedCategoriesCopy = [...selectedCategories];
  
      const displayFilteredData = data.filter((product) => {
        const brandFilter = selectedBrandsCopy.length === 0 || selectedBrandsCopy.includes(product.brand);
        const categoryFilter = selectedCategoriesCopy.length === 0 || selectedCategoriesCopy.includes(product.category);
        const rangeFilter = product.price >= range[0] && product.price <= range[1]
    
        return brandFilter && categoryFilter && rangeFilter;
      });
    console.log('Filtered Data:', displayFilteredData, selectedCategoriesCopy);

  
    setFilteredData(displayFilteredData);
  }, [selectedBrands, selectedCategories, data, setFilteredData, range]);
  
  

  useEffect(() => {
    let uniqueBrands = [];
    let uniqueCategories = [];

    data.forEach((element) => {
      if (!uniqueBrands.includes(element.brand)) {
        uniqueBrands.push(element.brand);
      }
      if (!uniqueCategories.includes(element.category)) {
        uniqueCategories.push(element.category);
      }
    });

    setBrands(uniqueBrands);
    setCategories(uniqueCategories);
  }, [data, setBrands, setCategories]);

  const toggleAccordion = (filterName) => {
    if(filterName === 'brand') {
      setIsBrandOpen(!isBrandOpen);
    }
    else if(filterName ==='category') {
      setIsCategoryOpen(!isCategoryOpen)
    }else if(filterName ==='range') {
      setIsRangeOpen(!isRangeOpen)
    }
  };




  return (
    <div className={styles.product_filter_container}  ref={accordionRef}>
      <div className={styles.each_filter_container}>
            <input
              type='checkbox'
              id='accordion_checkbox'
              className={styles.accordion_checkbox}
              checked={isBrandOpen}
              onChange={() => toggleAccordion('brand')}
      />
<label htmlFor='accordion_checkbox' className={styles.accordion}>
  Brands {isBrandOpen ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}
</label>

          <div className={`${styles.filter_container} ${styles.col}`}>

      {brands.map((brand) => (
          <label key={brand}>
          <input
            type="checkbox"
            value={brand}
            checked={selectedBrands.includes(brand)}
            onChange={() => handleCheckboxChange(brand)}
            />
          {brand}
        </label>
      ))}
      <div>
      </div>
      </div>
      </div>


      <div className={styles.each_filter_container}>
      <input
              type='checkbox'
              id='accordion_checkbox1'
              className={styles.accordion_checkbox}
              checked={isCategoryOpen}
              onChange={() => toggleAccordion('category')}
      />
    <label htmlFor='accordion_checkbox1' className={styles.accordion}>
    Category {isCategoryOpen ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}
    </label>

          <div className={`${styles.filter_container} ${styles.col}`}>

      {categories.map((category) => (
          <label key={category}>
          <input
            type="checkbox"
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryChange(category)}
            />
          {category}
        </label>
      ))}
      <div>
      </div>
      </div>
      </div>
      <div className={styles.each_filter_container}>
      <input
              type='checkbox'
              id='accordion_checkbox2'
              className={styles.accordion_checkbox}
              checked={isRangeOpen}
              onChange={() => toggleAccordion('range')}
      />
    <label htmlFor='accordion_checkbox2' className={styles.accordion}>
    Price {isRangeOpen ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}
    </label>

          <div className={`${styles.filter_container} ${styles.row}`}>
       <div className={styles.price}>  {range[0]}</div> 
       <Slider
            value={range}
            onChange={handleChanges}
            valueLabelDisplay="auto"  
            max={5000}
            min={0}
              />
          <div className={styles.price}>{range[1]}</div>
      <div>
      </div>
      </div>
      </div>


        </div> 
    
  );
};

export default ProductFilter;
