import { useEffect, useState } from "react";
import ProductFilter from "../ProductFilter";
import Products from "../Products";
import styles from "./styles.module.css";
import axios from "axios";
import Sort from "../ProductSort";

const Main = () => {
	const handleLogout = () => {
		sessionStorage.removeItem("token");
		window.location.reload();
	};
	const [data, setData] = useState([])
	const [filteredData, setFilteredData] = useState(data)
    const [products, setProducts] = useState([])

	useEffect(() => {
        getProducts()
    }, [])



    const getProducts = async () => {
        try {
				const url = "http://localhost:3001/products";
				const data = await axios.get(url);
				setProducts(data.data)
				setData(data.data)


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
			<div className={styles.content_body}>
				<div className={styles.inner_container}>
			<ProductFilter data={data} setFilteredData={setFilteredData}/>
			<Sort  setFilteredData={setFilteredData} />

				</div>
			<Products filteredData={filteredData}/>

			</div>

		</div>
	);
};

export default Main;
