import React  from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, FormBox, FormButton, FormTitle, InputBox, InputContainer, InputField, InputLabel, HelpText} from './RegisterPage.styled';
import { useDispatch } from 'react-redux';
import {authOperations} from '../../../redux/auth';

const initialValues = {
  email: '',
	name: '',
  password: '',
};

let schema = Yup.object().shape({
  name: Yup.string().min(4).max(32).required('Минимум 4 символа'),
	email: Yup.string().email('Invalid email').required('Например: example@gmail.com'), 
	password: Yup.string()
		.min(4, 'Password must be at least 4 characters')
		.max(16, 'Password must be 16 characters or less')
		.required('Минимум 4 символа'),
});


export const RegisterPage = () => {
	const dispatch = useDispatch();
	
	return (
		<Box> 
			<Formik 
		initialValues={initialValues}
		validationSchema={schema}
		onSubmit={(values, actions) => {
			//! values в формике это данные
			const {email, password, name} = values;
			// console.log(email);
			dispatch(authOperations.register({email, password, name}));

			actions.resetForm();
			actions.setSubmitting(false); 
		}}
		>
			<FormBox>
				<FormTitle>Registration</FormTitle>

				<InputBox>
					<InputContainer>
						<InputLabel>Email</InputLabel>
						<InputField
						id="email"
						name="email"
						type="email"
						placeholder="Enter email"
						/>
						<HelpText name="email" component="div" style={{ color: 'red' }} />
					</InputContainer>
					<InputContainer>
						<InputLabel>User name</InputLabel>
						<InputField
						id="name"
						name="name"
						type="text"
						placeholder="Enter user name"
						/>
						<HelpText name="name" component="div" style={{ color: 'red' }}>
						</HelpText>
					</InputContainer>
					<InputContainer>
						<InputLabel>Password</InputLabel>
						<InputField
						id="password"
						name="password"
						type="password"
						placeholder="Enter password"
						/>
						<HelpText name="password" component="div" style={{ color: 'red' }} />
					</InputContainer>
				</InputBox>

				<FormButton type='submit'>Submit</FormButton>
			</FormBox>
		</Formik>
		</Box>
	)
}