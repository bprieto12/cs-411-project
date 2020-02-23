import React from 'react';
import './Modal.css';
 

const Modal = props => {

	let displayed_content = null;
	const visiblityClass = props.show ? "visible" : "hidden"; 

	return (
		<div className={["Modal", visiblityClass].join(' ')} id="modal">
			<div className="ModalContent">
				<div className="Body">
					<button className="buttonStyles" onClick={e => {props.onClose && props.onClose(e)}}>{String.fromCharCode(10005)}</button>
					{props.children}
				</div>
			</div>
		</div>
	);
	
};

export default Modal;