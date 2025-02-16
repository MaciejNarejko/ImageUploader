import React from 'react'
import styled from 'styled-components'

interface UploadAreaProps {
	onFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void
	onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
	onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void
	onDrop: (e: React.DragEvent<HTMLDivElement>) => void
	onClick: () => void
	fileInputRef: React.RefObject<HTMLInputElement | null>
}

const UploadArea: React.FC<UploadAreaProps> = ({
	onFileSelected,
	onDragOver,
	onDragLeave,
	onDrop,
	onClick,
	fileInputRef,
}) => {
	return (
		<Area id='uploadArea' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} onClick={onClick}>
			<HiddenInput type='file' id='fileInput' accept='image/*' onChange={onFileSelected} ref={fileInputRef} />
			<UploadText>Przeciągnij i upuść obrazek tutaj lub kliknij, aby wybrać</UploadText>
			<LimitInfo> Maksymalny rozmiar pliku: 3 MB. Maksymalnie plików na serwerze: 5.</LimitInfo>
			<FormatInfo> Dopuszczalne formaty plików: JPG, JPEG, PNG, GIF.</FormatInfo>
			<UploadButton
				onClick={e => {
					e.stopPropagation()
					onClick()
				}}>
				Wybierz plik
			</UploadButton>
			<ProgressContainer id='progressContainer'>
				<ProgressBar id='progressBar' />
				<ProgressText id='progressText'>0%</ProgressText>
			</ProgressContainer>
		</Area>
	)
}

export default UploadArea

const Area = styled.div`
	border: 2px dashed #ccc;
	border-radius: 8px;
	padding: 40px;
	text-align: center;
	transition: background 0.3s, border-color 0.3s;
	position: relative;
	cursor: pointer;

	&.hover {
		background: rgba(0, 123, 255, 0.1);
		border-color: #007bff;
	}
`

const HiddenInput = styled.input`
	display: none;
`

const UploadText = styled.p`
	font-size: 1.2rem;
	margin: 0;
	pointer-events: none;
`
const LimitInfo = styled.p`
	margin-top: 10px;
	font-size: 0.9rem;
	color: #666;
	text-align: center;
`

const FormatInfo = styled.p`
	margin-top: 5px;
	font-size: 0.9rem;
	color: #666;
	text-align: center;
`

const UploadButton = styled.button`
	margin-top: 15px;
	padding: 12px 25px;
	background: #007bff;
	color: #fff;
	border: none;
	border-radius: 8px;
	font-size: 1rem;
	cursor: pointer;
	transition: background 0.3s;

	&:hover {
		background: #0056b3;
	}
`

const ProgressContainer = styled.div`
	width: 100%;
	background-color: #ddd;
	border-radius: 8px;
	overflow: hidden;
	margin-top: 15px;
	position: relative;
	height: 20px;
	display: none;
`

const ProgressBar = styled.div`
	height: 100%;
	width: 0%;
	background-color: #007bff;
	transition: width 0.3s;
`

const ProgressText = styled.span`
	position: absolute;
	width: 100%;
	text-align: center;
	top: 0;
	left: 0;
	line-height: 20px;
	font-weight: bold;
	color: #fff;
`
