import React from 'react'
import styled from 'styled-components'
import { ImageData } from '../types/imageTypes'
import { useEffect } from 'react'

interface ImageModalProps {
	image: ImageData
	onClose: () => void
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [onClose])

	return (
		<ModalOverlay onClick={onClose}>
			<ModalContent onClick={e => e.stopPropagation()}>
				<CloseButton onClick={onClose}>×</CloseButton>
				<ModalImage src={image.filePath} alt={image.fileName} />
			</ModalContent>
		</ModalOverlay>
	)
}

export default ImageModal

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
`

const ModalContent = styled.div`
	position: relative;
	border-radius: 8px;
	min-width: 150px;
	min-height: 150px;
	max-width: calc(100% - 50px);
	max-height: calc(100% - 50px);
	overflow: hidden;
`

const CloseButton = styled.button`
	position: absolute;
	line-height: 2rem;
	top: 10px;
	right: 10px;
	background: transparent;
	border: none;
	font-size: 4rem;
	cursor: pointer;
	color: #dfc0c0;
	&:hover {
		color: #007bff;
	}
`

const ModalImage = styled.img`
	max-width: 100%;
	max-height: 100%;
	object-fit: contain;
	border-radius: 4px;
`
