import React from 'react';
import './Nav.css';

const Nav = ({onRouteChange, isSignedIn}) => {
		if(isSignedIn){
			return(
				<nav className='tr w-100'>
				<p onClick={() => onRouteChange('signout')} className='f3 link white underline pa3 pointer'>Sign Out</p>
				</nav>
				);
		} else {
			return(
			<nav className='tr w-100'>
			<p onClick={() => onRouteChange('signin')} className='f3 link  white underline pa3 pointer'>Sign In</p>
			<p onClick={() => onRouteChange('register')} className='f3 link  white underline pa3 pointer'>Register</p>
			</nav>
			);
		}

}
export default Nav;