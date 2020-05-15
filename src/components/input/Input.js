import React from 'react';
import './Input.css';

const Input = ({onInputChange, onButtonSubmit}) => {
	return(
		<div className='inputContainer'>
		<input className='fl w-80' type='text'
	 	placeholder='Image Link'
	 	onChange={onInputChange}
	 	/>
	 	<button type='submit'
	 	onClick={onButtonSubmit}
	 	>
	 	Detect
	 	</button>
	 	</div>
		)
}
export default Input;