import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from '../../firebase'; // Импортируйте вашу конфигурацию Firebase
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';

const token = {
  set(token) {
		console.log(axios.defaults)
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
		console.log(axios.defaults)
    axios.defaults.headers.common.Authorization = '';
  }
};

//! Registr Standart 
// const register = createAsyncThunk('auth/register', async credentials => {
// 	try {
// 		const {data} = await axios.post('/user/signup', credentials);
// 		token.set(data.token);
// 		return data;
// 	} catch (error) {
// 	}
// })
//! Registr reqres
// const register = createAsyncThunk('auth/register', async credentials => {
// 	try {
// 		const {data} = await axios.post('https://reqres.in/api/register', credentials);
// 		token.set(data.token);
// 		return data;
// 	} catch (error) {
// 	}
// })
//! Registr firebase 
const register = createAsyncThunk('auth/register', async (credentials) => {
	try {
			const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password, credentials.name);
			console.log(credentials);
			const user = userCredential.user;
			await updateProfile(user, { displayName: credentials.name });
			console.log("Пользователь зарегистрирован:", user);
			return { ...user, displayName: credentials.name };
	} catch (error) {
			console.error("Ошибочка:", error);
			throw error;
	}
});



//! login Standart
// const logIn = createAsyncThunk('auth/login', async credentials => {
// 	try{ 
// 		const {data} = await axios.post('/user/login', credentials);
// 		token.set(data.token);
// 		return data;
// 	} catch (error) {
// 	}
// })
//! login reqres
// const logIn = createAsyncThunk('auth/login', async credentials => {
// 	try{ 
// 		const {data} = await axios.post('https://reqres.in/api/login', credentials);
// 		console.log("data",data)
// 		token.set(data.token);
// 		return data;
// 	} catch (error) {
// 		console.log(error);
// 		throw error;
// 	}
// })
//! login firebase 
const logIn = createAsyncThunk('auth/login', async (credentials) => {
	try {
			const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
			// console.log(credentials);
			const user = userCredential.user;
			console.log("Пользователь Вошел:", user);
			return user; 
	} catch (error) {
			console.error("Ошибочка:", error);
			throw error;
	}
});



//! logout Standart
// const logOut = createAsyncThunk('auth/logout', async () => {
// 	try{
// 		await axios.post('/user/logut');
// 		token.unset();
// 	} catch (error) {
// 	}
// })
//! logout reqres
const logOut = createAsyncThunk('auth/logout', async () => {
	try{
		await axios.post('https://reqres.in/api/logut');
		token.unset();
	} catch (error) {
		console.log(error);
	}
})

const fetchCurrentUser  = createAsyncThunk(
	'auth/refresh', 
	async (_, thunkAPI) => {
	console.log(thunkAPI.getState());
	const state = thunkAPI.getState();
	const persistedToken = state.auth.token;

	console.log(token)

	if(token === null) {
		return;
	}
	token.set(persistedToken);
	// try{
	// 	const {data} = await axios.get('/user/current');
	// 	console.log(data)
	// return data;
	// } catch(error) {
	// 	console.log(error);
	// }
}) 

export const authOperations = {
	register,
	logIn,
	logOut,
	fetchCurrentUser
};