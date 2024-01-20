import React, { useEffect, useState } from 'react';
import styles from './styles.module.css'
const ProductFilter = ({data, setFilteredData, filteredData}) => {
  // State to track selected brands
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brand, setBrands] = useState([]);
  const [category, setCategory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((selectedBrand) => selectedBrand !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };
  
  useEffect(() => {
    // Create a copy of the selected brands
    const selectedBrandsCopy = [...selectedBrands];
  
    // Filter the data based on selected brands
    const displayData = data.filter((product) =>
      selectedBrandsCopy.includes(product.brand)
    );
  
    // Update the filtered data state
    setFilteredData(displayData);
  }, [selectedBrands, data]);
  
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
    setCategory(uniqueCategories);
    console.log(selectedBrands);
  }, [data, setBrands, setCategory, selectedBrands]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
        <h5 className={styles.accordion} onClick={toggleAccordion}>Filter By Brands {isOpen ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}</h5>
          {isOpen&& <div className={styles.brand_container}>

      {brand.map((brand) => (
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
      </div>}
    </div>
  );
};

export default ProductFilter;
