import React, { useState, useRef, useCallback } from 'react'
import styled from 'styled-components'

interface UploadAreaProps {
	onFilesUpload: (files: File[]) => void
	isUploading: boolean
	uploadProgress: number
}

const UploadArea: React.FC<UploadAreaProps> = ({ onFilesUpload, isUploading, uploadProgress }) => {
	const [isHovering, setIsHovering] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const filesArray = Array.from(e.target.files)
			onFilesUpload(filesArray)
			e.target.value = ''
		}
	}

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsHovering(true)
	}

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsHovering(false)
	}

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsHovering(false)
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			const filesArray = Array.from(e.dataTransfer.files)
			onFilesUpload(filesArray)
		}
	}

	const handleClick = useCallback(() => {
		fileInputRef.current?.click()
	}, [])

	return (
		<Area
			$isHovering={isHovering}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			onClick={handleClick}>
			<HiddenInput type='file' accept='image/*' ref={fileInputRef} onChange={handleFilesSelected} multiple />
			<UploadText>Przeciągnij i upuść obrazek tutaj lub kliknij, aby wybrać</UploadText>
			<LimitInfo>Maksymalny rozmiar pliku: 3 MB. Maksymalnie plików na serwerze: 10</LimitInfo>
			<FormatInfo>Dopuszczalne formaty plików: JPG, JPEG, PNG, GIF.</FormatInfo>
			<UploadButton
				onClick={e => {
					e.stopPropagation()
					handleClick()
				}}>
				Wybierz plik
			</UploadButton>

			{isUploading && (
				<ProgressContainer>
					<ProgressBar style={{ width: `${uploadProgress}%` }} />
					<ProgressText>{uploadProgress}%</ProgressText>
				</ProgressContainer>
			)}
		</Area>
	)
}

export default UploadArea

interface AreaProps {
	$isHovering: boolean
}

const Area = styled.div<AreaProps>`
	border: 2px dashed #ccc;
	border-radius: 8px;
	padding: 40px;
	text-align: center;
	transition: background 0.3s, border-color 0.3s;
	position: relative;
	cursor: pointer;
	background: ${({ $isHovering }) => ($isHovering ? 'rgba(0,123,255,0.1)' : 'transparent')};
	border-color: ${({ $isHovering }) => ($isHovering ? '#007bff' : '#ccc')};
`

const HiddenInput = styled.input`
	position: absolute;
	left: -9999px;
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
`

const ProgressBar = styled.div`
	height: 100%;
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
