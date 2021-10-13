import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Input from "./Helper/Input";

const ForgotPassword = () => {

	const [emailSent, setEmailSent] = useState(false);

	const [token, setToken] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, sendOtp, loading, isAuthenticated, error, resetPassword } = useContext(UserContext);

	const history = useHistory();
	const location = useLocation();

	const urlparams = new URLSearchParams(location.search);
	const redirect = urlparams.get("next") || "/";

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await resetPassword(email, token, password)
			await login({ username: email, password });
		} catch (error) {
			console.log(error)
		}
	};

	const sendEmail = async (e) => {
		e.preventDefault()
		const lol = await sendOtp(email)

		if (lol) setEmailSent(true)
	}

	useEffect(() => {
		if (isAuthenticated) return history.push(redirect);
	});

	if (!emailSent) {
		return (<div style={{ maxWidth: "400px", margin: "0 auto" }}>
			<br />

			<h2>Enter Your Email</h2>
			<h2 style={{ color: "red" }}> {error} </h2>

			<form onSubmit={sendEmail} >
				<Input
					value={email}
					setValue={setEmail}
					type="text"
					placeholder="Email"
					required={true}
				/>
				<button className="btn btn-primary">send otp</button>
			</form>

		</div>)
	}

	return (
		<div style={{ maxWidth: "400px", margin: "0 auto" }}>
			<br />
			<h2>Reset Password</h2>
			<h2 style={{ color: "red" }}> {error} </h2>
			<form onSubmit={submitHandler}>
				<Input
					value={token}
					setValue={setToken}
					type="text"
					placeholder="otp sent on email"
					label="oTP"
					required={true}
				/>
				<Input
					type="password"
					value={password}
					setValue={setPassword}
					placeholder="password"
					label="New password"
					required={true}
				/>

				<button className="btn btn-primary">
					reset password
				</button>
			</form>

		</div>
	);
};

export default ForgotPassword
