import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import UploadArea from './components/UploadArea'
import Gallery from './components/Gallery'
import Toast from './components/Toast'
import { ImageData } from './types/imageTypes'
import { mockImages } from './mocs/mockData'
import ImageModal from './components/ImageModal'
import Layout from './components/Layout'
import useFileUpload from './hooks/useFileUpload'

function App() {
	const [images, setImages] = useState<ImageData[]>(mockImages)
	const [sortOption, setSortOption] = useState<string>('nameAsc')
	const [toastMsg, setToastMsg] = useState<string>('')
	const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)

	const showToast = useCallback((message: string, duration = 3000) => {
		setToastMsg(message)
		setTimeout(() => setToastMsg(''), duration)
	}, [])

	const handleFileUploaded = useCallback((newImage: ImageData) => {
		setImages(prev => [...prev, newImage])
	}, [])

	const { isUploading, uploadProgress, uploadFile } = useFileUpload({
		onFileUploaded: handleFileUploaded,
		showToast,
	})

	const handleDownload = useCallback((img: ImageData) => {
		const link = document.createElement('a')
		link.href = img.filePath
		link.download = img.fileName
		link.target = '_blank'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}, [])

	const handleDelete = useCallback(
		(img: ImageData) => {
			setImages(prev => prev.filter(item => item.fileName !== img.fileName))
			showToast('Obrazek został usunięty')
		},
		[showToast]
	)

	const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortOption(e.target.value)
	}, [])

	const handleImageClick = useCallback((img: ImageData) => {
		setSelectedImage(img)
	}, [])

	return (
		<Layout>
			<AppWrapper>
				<AppTitle>Image Uploader - Prześlij i wyświetl!</AppTitle>
				<UploadArea onFileUpload={uploadFile} isUploading={isUploading} uploadProgress={uploadProgress} />
				<Gallery
					images={images}
					sortOption={sortOption}
					onSortChange={handleSortChange}
					onDownload={handleDownload}
					onDelete={handleDelete}
					onImageClick={handleImageClick}
				/>
				<Toast message={toastMsg} />
				{selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
			</AppWrapper>
		</Layout>
	)
}

export default App

const AppWrapper = styled.div`
	padding: 25px;
	background-color: white;
	border-radius: 8px;
	box-shadow: 1px 2px 6.8px 0 rgba(180, 161, 161, 0.25);
`

const AppTitle = styled.h1`
	text-align: center;
	margin-bottom: 20px;
	color: #313c4b;
`
