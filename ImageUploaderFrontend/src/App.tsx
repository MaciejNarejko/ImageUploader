import { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Layout from './components/Layout'
import Gallery from './components/Gallery'
import ImageModal from './components/ImageModal'
import UploadArea from './components/UploadArea'
import Toast from './components/Toast'
import { ImageData } from './types/imageTypes'
import { useFileUpload } from './hooks/useFileUpload'

function App() {
	const [images, setImages] = useState<ImageData[]>([])
	const [sortOption, setSortOption] = useState<string>('nameAsc')
	const [toastMsg, setToastMsg] = useState<string>('')
	const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)

	useEffect(() => {
		const API_URL = import.meta.env.VITE_API_URL
		fetch(`${API_URL}/api/images`)
			.then(res => {
				if (!res.ok) {
					throw new Error('Failed to fetch images')
				}
				return res.json()
			})
			.then((data: ImageData[]) => setImages(data))
			.catch(error => {
				console.error('Error fetching images:', error)
			})
	}, [])

	const showToast = useCallback((message: string, duration = 3000) => {
		setToastMsg(message)
		setTimeout(() => setToastMsg(''), duration)
	}, [])

	const handleFilesUploaded = useCallback((newImages: ImageData[]) => {
		setImages(prev => [...prev, ...newImages])
	}, [])

	const { isUploading, uploadProgress, uploadFiles } = useFileUpload({
		onFilesUploaded: handleFilesUploaded,
		showToast,
		existingImages: images,
	})

	const handleDownload = useCallback(async (img: ImageData) => {
		const API_URL = import.meta.env.VITE_API_URL
		const fileUrl = `${API_URL}${img.filePath}`

		try {
			const response = await axios.get(fileUrl, { responseType: 'blob' })
			const url = window.URL.createObjectURL(new Blob([response.data]))
			const link = document.createElement('a')
			link.href = url
			link.download = img.fileName
			link.click()
			window.URL.revokeObjectURL(url)
		} catch (error) {
			console.error('Error downloading file:', error)
		}
	}, [])

	const handleDelete = useCallback(
		async (img: ImageData) => {
			const API_URL = import.meta.env.VITE_API_URL
			try {
				await axios.delete(`${API_URL}/api/images/${img.id}`)
				setImages(prev => prev.filter(item => item.id !== img.id))
				showToast('Obrazek został usunięty', 3000)
			} catch (error) {
				console.error('Error deleting image:', error)
				showToast('Wystąpił błąd przy usuwaniu obrazka', 3000)
			}
		},
		[setImages, showToast]
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
				<UploadArea onFilesUpload={uploadFiles} isUploading={isUploading} uploadProgress={uploadProgress} />
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
