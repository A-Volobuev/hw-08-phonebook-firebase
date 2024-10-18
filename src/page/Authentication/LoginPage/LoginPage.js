import React  from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, FormBox, FormButton, FormTitle, InputBox, InputContainer, InputField, InputLabel, HelpText } from './LoginPage.styled';
import { useDispatch } from 'react-redux';
import {authOperations} from '../../../redux/auth';

const initialValues = {
  email: '',
  password: '',
};

let schema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Email is required'), 
		password: Yup.string()
			.min(4, 'Password must be at least 4 characters')
			.max(16, 'Password must be 16 characters or less')
			.required('Password is required'),
	});

export const LoginPage = () => {
	const dispatch = useDispatch();

	return(
		<Box> 
			<Formik 
		initialValues={initialValues}
		validationSchema={schema}
		onSubmit={(values, actions) => {
			//! values в формике это данные
			console.log(values);
			const {email, password} = values;
			// console.log(email);
			dispatch(authOperations.logIn({email, password}));
			actions.resetForm();
			actions.setSubmitting(false); 
		}}
		>
			<FormBox>
				<FormTitle>Authorization</FormTitle>

				<InputBox>
					<InputContainer>
						<InputLabel>Email</InputLabel>
						<InputField
						id="email"
						name="email"
						type="email"
						placeholder="Enter email"
						/>
						<ErrorMessage name="email" component="div" style={{ color: 'red' }} />
						<HelpText>Формат почты Example@gmail.com</HelpText>
					</InputContainer>
					<InputContainer>
						<InputLabel>Password</InputLabel>
						<InputField
						id="password"
						name="password"
						type="password"
						placeholder="Enter password"
						/>
						<ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            <HelpText>Минимум 6 символов, максимум 16</HelpText>
					</InputContainer>
				</InputBox>
				
				<FormButton type='submit'>Submit</FormButton>
			</FormBox>
		</Formik>
		</Box>
	)
}