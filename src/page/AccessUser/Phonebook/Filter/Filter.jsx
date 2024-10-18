import React from 'react';
import {FilterLabel, FilterInput} from './Filter.styled'
import {useDispatch } from 'react-redux';

import { onChangeFilter } from '../../../../redux';

export const Filter = () => {
	const dispatch = useDispatch();

	// Передаем данные текст с фильтра в фильтерРедюс
	const onInputValueChange = (e) => {
		const inputValue = e.target.value;
		dispatch(onChangeFilter(inputValue.toLowerCase()))
	}
	return(
		<FilterLabel>
			Find contacts by name
			<FilterInput type="text" onChange={onInputValueChange} placeholder="Name"/>
		</FilterLabel>
	)
}

