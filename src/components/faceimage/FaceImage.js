import React from 'react';
import './FaceImage.css';

const FaceImage = ({ box, image }) => {
	return(		
		<div className='flex flex-column items-center center ma'>
		<div className='absolute mt2'>
		<img id='inputImage' alt='' src={image} width='500px' height='auto'/>		
		<div className='bounding_box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
		</div>
		</div>
		);
}
export default FaceImage;