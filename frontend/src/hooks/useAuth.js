import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
	const authState = useSelector((state) => state.auth);
	const user = authState.user;
	const [auth, setAuth] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (user) {
			setAuth(true);
		} else {
			setAuth(false);
		}
		setLoading(false);
	}, [user]);

	return {auth, loading};
};
