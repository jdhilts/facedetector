import React from 'react';
import {Fragment} from 'react';
import './Rank.css';
const Rank = ({name, entries}) => {	
	return(
		<Fragment>
		<h2 className='mb2 mt2'>
		{`Welcome ${name}! Your entry count is...`}
		</h2>
		<h1 className='mt2'>
		{`#${entries}`}
		</h1>
		</Fragment>
		)
}
export default Rank;