import React from "react";
import "./Auth.css";

//Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

//Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { register, reset } from "../../slices/AuthSlice";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.auth);

	const handleSubmit = (e) => {
		e.preventDefault();
		const user = {
			name,
			email,
			password,
			confirmPassword,
		};
		console.log(user);
		dispatch(register(user));
	};

	useEffect(() => {
		//Sempre que houver um dispatch ele reseta os dados para limpar os erros do antigo.
		dispatch(reset());
	}, [dispatch]);

	return (
		<div id="register">
			<h2>ReactGram</h2>
			<p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Nome"
					value={name || ""}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="email"
					placeholder="Email"
					value={email || ""}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Senha"
					value={password || ""}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Confirme a senha"
					value={confirmPassword || ""}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				{!loading && <input type="submit" value={"Cadastrar"} />}
				{loading && <input type="submit" value={"Aguarde"} disabled />}
				{error && <Message msg={error} type="error" />}
			</form>
			<p>
				Já tem uma conta? <Link to={"/login"}>Clique aqui.</Link>
			</p>
		</div>
	);
};

export default Register;
