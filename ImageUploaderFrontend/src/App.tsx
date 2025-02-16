import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import UploadArea from './components/UploadArea'
import Gallery from './components/Gallery'
import Toast from './components/Toast'
import './App.css'

export interface ImageData {
	fileName: string
	filePath: string
	uploadDate: string
	resolution: string
}

export const mockImages: ImageData[] = [
	{
		fileName: 'obraz1.jpg',
		filePath: 'https://perfumedubai.com/cdn/shop/articles/dior_sauvage_460x@2x.jpg',
		uploadDate: new Date('2023-10-01T12:00:00Z').toISOString(),
		resolution: '400x300',
	},
	{
		fileName: 'obraz2.jpg',
		filePath:
			'https://www.perfumelounge.eu/_next/image?url=https%3A%2F%2Fmedia.perfumelounge.eu%2Ffile%2Fperfumelounge%2Fperfumelounge%2Foriginal_images%2FMaison_Francis_Kurkdjian_-_Grand_Soir_eau_de_parfum_70_ml.jpg&w=3840&q=75',
		uploadDate: new Date('2023-09-28T15:30:00Z').toISOString(),
		resolution: '400x300',
	},
	{
		fileName: 'obraz3.jpg',
		filePath:
			'https://a.allegroimg.com/original/112119/e61f4a534079a8aa23495f22909b/MIRRA-Perfumes-213-Delina-Extrait-de-Parfum-10ml',
		uploadDate: new Date('2023-09-25T09:15:00Z').toISOString(),
		resolution: '400x300',
	},
]

function App() {
	const [images, setImages] = useState<ImageData[]>(mockImages)
	const [sortOption, setSortOption] = useState<string>('nameAsc')
	const [toastMsg, setToastMsg] = useState<string>('')
	const fileInputRef = useRef<HTMLInputElement>(null)

	const showToast = (message: string, duration = 3000) => {
		setToastMsg(message)
		setTimeout(() => setToastMsg(''), duration)
	}

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}

	const uploadFile = (file: File) => {
		console.log('Uploading file:', file.name)
		const progressContainer = document.getElementById('progressContainer')
		const progressBar = document.getElementById('progressBar')
		const progressText = document.getElementById('progressText')

		if (progressContainer && progressBar && progressText) {
			progressContainer.style.display = 'block'
			progressBar.style.width = '0%'
			progressText.textContent = '0%'
			let progress = 0
			const interval = setInterval(() => {
				progress += 10
				progressBar.style.width = progress + '%'
				progressText.textContent = progress + '%'
				if (progress >= 100) {
					clearInterval(interval)
					setTimeout(() => {
						const now = new Date().toISOString()
						const newImage: ImageData = {
							fileName: file.name,
							filePath: 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(file.name),
							uploadDate: now,
							resolution: '400x300',
						}
						setImages(prev => [...prev, newImage])
						showToast('Obrazek został przesłany')
						progressContainer.style.display = 'none'
					}, 500)
				}
			}, 200)
		}
	}

	const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			uploadFile(e.target.files[0])
			e.target.value = ''
		}
	}

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		const uploadArea = document.getElementById('uploadArea')
		if (uploadArea) {
			uploadArea.classList.add('hover')
		}
	}

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		const uploadArea = document.getElementById('uploadArea')
		if (uploadArea) {
			uploadArea.classList.remove('hover')
		}
	}

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		const uploadArea = document.getElementById('uploadArea')
		if (uploadArea) {
			uploadArea.classList.remove('hover')
		}
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			uploadFile(e.dataTransfer.files[0])
		}
	}

	const handleDownload = (img: ImageData) => {
		const link = document.createElement('a')
		link.href = img.filePath
		link.download = img.fileName
		link.target = '_blank'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	const handleDelete = (img: ImageData) => {
		setImages(prev => prev.filter(item => item.fileName !== img.fileName))
		showToast('Obrazek został usunięty')
	}

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortOption(e.target.value)
	}

	return (
		<AppWrapper>
			<AppTitle>Image Uploader - Prześlij i wyświetl!</AppTitle>
			<UploadArea
				onFileSelected={handleFileSelected}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={handleButtonClick}
				fileInputRef={fileInputRef}
			/>
			<Gallery
				images={images}
				sortOption={sortOption}
				onSortChange={handleSortChange}
				onDownload={handleDownload}
				onDelete={handleDelete}
			/>
			<Toast message={toastMsg} />
		</AppWrapper>
	)
}

export default App

const AppWrapper = styled.div`
	width: 100%;
	max-width: 900px;
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
