import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { ImageData } from '../types/imageTypes'

interface ImageItemProps {
	image: ImageData
	onDownload: (image: ImageData) => void
	onDelete: (image: ImageData) => void
	onImageClick: (image: ImageData) => void
}

const ImageItem: React.FC<ImageItemProps> = ({ image, onDownload, onDelete, onImageClick }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		setDropdownOpen(prev => !prev)
	}

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				setDropdownOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const formatFileSize = (size: number): string => {
		if (size < 1024) return size + ' B'
		const kb = size / 1024
		if (kb < 1024) return kb.toFixed(1) + ' KB'
		const mb = kb / 1024
		return mb.toFixed(1) + ' MB'
	}

	return (
		<GalleryItem>
			<Thumbnail
				src={`https://localhost:7124${image.filePath}`}
				alt={image.fileName}
				onClick={() => onImageClick(image)}
			/>
			<FileInfo>
				<FileName onClick={() => onImageClick(image)}>{image.fileName}</FileName>
				<FileDate>Uploaded: {new Date(image.uploadDate).toLocaleString()}</FileDate>
				<FileRes>
					Resolution: {image.width} x {image.height}
				</FileRes>
				<FileSize>File size: {formatFileSize(image.fileSize)}</FileSize>
			</FileInfo>
			<Dropdown ref={dropdownRef}>
				<DropdownToggle onClick={handleToggle}>...</DropdownToggle>
				{dropdownOpen && (
					<DropdownMenu>
						<DropdownButton
							onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
								e.stopPropagation()
								onDownload(image)
								setDropdownOpen(false)
							}}>
							Download
						</DropdownButton>
						<DropdownButton
							onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
								e.stopPropagation()
								onDelete(image)
								setDropdownOpen(false)
							}}>
							Delete
						</DropdownButton>
					</DropdownMenu>
				)}
			</Dropdown>
		</GalleryItem>
	)
}

export default ImageItem

const GalleryItem = styled.div`
	display: flex;
	align-items: stretch;
	background: #fff;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.3s;
	padding: 10px;
	margin-bottom: 10px;

	&:hover {
		transform: scale(1.02);
	}
`

const Thumbnail = styled.img`
	width: 80px;
	height: 80px;
	object-fit: cover;
	border-radius: 8px;
	margin-right: 15px;
	flex-shrink: 0;
	cursor: pointer;
`

const FileInfo = styled.div`
	flex-grow: 1;
`

const FileName = styled.p`
	margin: 3px 0;
	font-size: 0.95em;
	font-weight: 500;
	cursor: pointer;
	&:hover {
		color: #007bff;
		text-decoration: underline;
	}
`

const FileDate = styled.p`
	margin: 3px 0;
	font-size: 0.8em;
	color: #666;
`

const FileRes = styled.p`
	margin: 3px 0;
	font-size: 0.8em;
	color: #666;
`

const FileSize = styled.p`
	margin: 3px 0;
	font-size: 0.8em;
	color: #666;
`

const Dropdown = styled.div`
	position: relative;
	display: inline-block;
`

const DropdownToggle = styled.button`
	background: transparent;
	border: none;
	cursor: pointer;
	font-size: 1.5em;
	padding: 0 5px;
	line-height: 0;
`

const DropdownMenu = styled.div`
	position: absolute;
	right: 0;
	background: #fff;
	min-width: 120px;
	border: 1px solid #ddd;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	z-index: 100;
	border-radius: 8px;
`

const DropdownButton = styled.button`
	width: 100%;
	background: none;
	border: none;
	padding: 8px 10px;
	text-align: left;
	cursor: pointer;
	font-size: 0.9em;

	&:hover {
		background: #007bff;
		color: #fff;
	}
`
