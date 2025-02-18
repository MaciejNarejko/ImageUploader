import { useState, useCallback } from 'react'
import { ImageData } from '../types/imageTypes'
import { uploadImages } from '../services/imageService'
import { AxiosProgressEvent } from 'axios'

interface UseFileUploadReturn {
	isUploading: boolean
	uploadProgress: number
	uploadFiles: (files: File[]) => void
}

interface UseFileUploadProps {
	onFilesUploaded: (newImages: ImageData[]) => void
	showToast: (message: string, duration?: number) => void
	existingImages: ImageData[]
}

export function UseFileUpload({ onFilesUploaded, showToast, existingImages }: UseFileUploadProps): UseFileUploadReturn {
	const [isUploading, setIsUploading] = useState<boolean>(false)
	const [uploadProgress, setUploadProgress] = useState<number>(0)

	const uploadFiles = useCallback(
		async (files: File[]) => {
			const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif']
			for (const file of files) {
				const fileExtension = file.name.split('.').pop()?.toLowerCase()
				if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
					showToast('Dopuszczalne formaty plików: JPG, JPEG, PNG, GIF.', 3000)
					return
				}
			}

			const newFileNames = files.map(file => file.name)
			const uniqueNewFileNames = new Set(newFileNames)
			if (uniqueNewFileNames.size !== newFileNames.length) {
				showToast('Pliki nie mogą mieć tej samej nazwy.', 3000)
				return
			}

			const existingNames = new Set(existingImages.map(img => img.fileName))
			for (const file of files) {
				if (existingNames.has(file.name)) {
					showToast(`Plik o nazwie ${file.name} już istnieje.`, 3000)
					return
				}
			}

			if (existingImages.length + files.length > 10) {
				showToast('Limit plików na serwerze wynosi 10. Usuń niektóre zdjęcia, aby wgrać nowe.', 3000)
				return
			}

			const formData = new FormData()
			files.forEach(file => formData.append('files', file))

			setIsUploading(true)
			setUploadProgress(0)

			try {
				const newImages = await uploadImages(formData, (progressEvent: AxiosProgressEvent) => {
					if (progressEvent.total) {
						const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
						setUploadProgress(progress)
					}
				})
				onFilesUploaded(newImages)
				showToast('Pliki zostały przesłane', 3000)
			} catch (error) {
				console.error('Error uploading files:', error)
				showToast('Błąd wgrywania plików', 3000)
			} finally {
				setIsUploading(false)
				setUploadProgress(0)
			}
		},
		[onFilesUploaded, showToast, existingImages]
	)

	return { isUploading, uploadProgress, uploadFiles }
}
