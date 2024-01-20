import { useEffect, useState } from "react";
import ProductFilter from "../ProductFilter";
import Products from "../Products";
import styles from "./styles.module.css";
import axios from "axios";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	const [data, setData] = useState([])
	const [filteredData, setFilteredData] = useState(data)
    const [products, setProducts] = useState([])

	useEffect(() => {
        getProducts()
    }, [])
	useEffect(() => {
        console.log(filteredData);
    }, [filteredData])


    const getProducts = async () => {
        try {
            const url = "http://localhost:3001/products";

            const data = await axios.get(url);
            setProducts(data.data)
            setData(data.data)
            console.log(data);

        }catch (e) {
            console.log(e);
        }
    }
    

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>btu market</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<ProductFilter data={data} setFilteredData={setFilteredData} filteredData={filteredData}/>

			<Products setData={setData} data={data} filteredData={filteredData}/>
		</div>
	);
};

export default Main;
