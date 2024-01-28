import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
	const capitalLetterRegex = /[A-Z]/;
	const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
	const [isValid, setIsValid] = useState({email:'', password:'', firstName: '', lastName:''});


	const handleChange = ( input ) => {
		const { name, value } = input.target;

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
		  }else if(name === 'firstName') {
			if(value.length === 0) {
				setIsValid((prevIsValid) => ({ ...prevIsValid, firstName: 'First Name is Required' }));
			}else 
			if(value.length <=2) {
				setIsValid((prevIsValid) => ({ ...prevIsValid, firstName: 'First Name must be at least 3 characters' }));
			}
			else {
				setIsValid((prevIsValid) => ({ ...prevIsValid, firstName: '' }));
			}
		  }else if(name === 'lastName') {
			if(value.length === 0) {
				setIsValid((prevIsValid) => ({ ...prevIsValid, lastName: 'Last Name is Required' }));
			}else 
			if(value.length <=2) {
				setIsValid((prevIsValid) => ({ ...prevIsValid, lastName: 'Last Name must be at least 3 characters' }));
			}
			else {
				setIsValid((prevIsValid) => ({ ...prevIsValid, lastName: '' }));
			}
		  }
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		if(isValid.email !== '' || isValid.password !== '' || isValid.firstName !== '' || isValid.lastName !== '') {
			e.preventDefault()
			return;
		}else {

			try {
				const url = "http://localhost:8000/api/users";
				const { data: res } = await axios.post(url, data);
				navigate("/login");
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
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sing in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						   {isValid.firstName !== '' && <p style={{ color: 'red' }}>{isValid.firstName}</p>}
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>   {isValid.lastName !== '' && <p style={{ color: 'red' }}>{isValid.lastName}</p>}
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
							Sing Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
