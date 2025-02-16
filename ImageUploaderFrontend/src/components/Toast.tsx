import styled from 'styled-components'

interface ToastProps {
	message: string
}

const Toast: React.FC<ToastProps> = ({ message }) => {
	if (!message) return null
	return <ToastWrapper className='show'>{message}</ToastWrapper>
}

export default Toast

const ToastWrapper = styled.div`
	position: fixed;
	top: 20px;
	right: 20px;
	background: #007bff;
	color: #fff;
	padding: 15px 20px;
	border-radius: 8px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
	opacity: 0;
	visibility: hidden;
	transform: translateY(-20px);
	transition: opacity 0.5s, transform 0.5s, visibility 0.5s;
	z-index: 1000;

	&.show {
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
	}
`
