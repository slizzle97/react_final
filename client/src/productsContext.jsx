// import axios from 'axios';
// import React, { createContext, useContext, useEffect, useState } from 'react';

// const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {
//   const [products, setProducts] = useState([
//   ]);
//   const getProducts = async () => {
//     try {
//     const url = "http://localhost:3001/products";
//     const data = await axios.get(url);
//     setProducts(data.data)
//     }catch (e) {
//         console.log(e);
//     }
// }
//   useEffect(() => {
//     console.log('Effect triggered');

//     getProducts()
//   }, [])


//   return (
//     <ProductContext.Provider value={{ products }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export const useProduct = () => {
//   return useContext(ProductContext);
// };
