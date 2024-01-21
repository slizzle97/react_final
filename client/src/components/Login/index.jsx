import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
	const capitalLetterRegex = /[A-Z]/;
	const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
	const [isValid, setIsValid] = useState({email:'', password:''});
  
	
	
	const handleChange = (e) => {
		const { name, value } = e.target;
	
		setData({ ...data, [name]: value });
	
		if (name === 'email') {
			if(value.length === 0) {
				setIsValid((prevIsValid) => ({ ...prevIsValid, email: 'Email is Required' }));
			}else if(!emailRegex.test(value)) {

				setIsValid((prevIsValid) => ({ ...prevIsValid, email: 'Invalid email format. Must end with @gmail.com' }));
			} else {
				setIsValid((prevIsValid) => ({...prevIsValid, email: ''}))
			}
		} else if (name === 'password') {
			if(value.length === 0) {
				setIsValid((prevIsValid) => ({ ...prevIsValid, password: 'Passoword is Required' }));
			}else
			if(value.length < 8) {
				setIsValid((prevIsValid) => ({ ...prevIsValid, password: 'Password must be at least 8 characters' }));
			}else
			if(!capitalLetterRegex.test(value)) {

				setIsValid((prevIsValid) => ({ ...prevIsValid, password: 'Password must contain at least 1 capital letter' }));
			}
			else if(!symbolRegex.test(value)) {
				setIsValid((prevIsValid) => ({ ...prevIsValid, password: 'Password must contain at least 1  symbol' }));
			}
			else {
				setIsValid((prevIsValid) => ({ ...prevIsValid, password: '' }));
				
			}
		}
	  };

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(isValid.email !== '' || isValid.password !== '') {
			e.preventDefault()
			return;
		}else {

			try {
				const url = "http://localhost:8000/api/auth";
				const { data: res } = await axios.post(url, data);
				sessionStorage.setItem("token", res.data);
				window.location = "/products";
			} catch (error) {
				if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						      {isValid.email !== '' && <p style={{ color: 'red' }}>{isValid.email}</p>}

						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{isValid.password !== '' && <p style={{ color: 'red' }}>{isValid.password}</p>}
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sing In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sing Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
