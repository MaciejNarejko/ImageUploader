import { useState, useCallback } from 'react'
import { ImageData } from '../types/imageTypes'

interface UseFileUploadReturn {
	isUploading: boolean
	uploadProgress: number
	uploadFile: (file: File) => void
}

interface UseFileUploadProps {
	onFileUploaded: (newImage: ImageData) => void
	showToast: (message: string, duration?: number) => void
}

const useFileUpload = ({ onFileUploaded, showToast }: UseFileUploadProps): UseFileUploadReturn => {
	const [isUploading, setIsUploading] = useState<boolean>(false)
	const [uploadProgress, setUploadProgress] = useState<number>(0)

	const uploadFile = useCallback(
		(file: File) => {
			const fileExtension = file.name.split('.').pop()?.toLowerCase()
			if (!fileExtension || !['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
				showToast('Dopuszczalne formaty plików: JPG, JPEG, PNG, GIF.', 3000)
				return
			}
			setIsUploading(true)
			setUploadProgress(0)
			let progress = 0

			const interval = setInterval(() => {
				progress += 10
				setUploadProgress(progress)
				if (progress >= 100) {
					clearInterval(interval)
					setTimeout(() => {
						const now = new Date().toISOString()
						const newImage: ImageData = {
							fileName: file.name,
							filePath: `https://narejko.net/400x300?text=${encodeURIComponent(file.name)}`,
							uploadDate: now,
							resolution: '400x300',
						}
						onFileUploaded(newImage)
						showToast('Obrazek został przesłany', 3000)
						setIsUploading(false)
						setUploadProgress(0)
					}, 500)
				}
			}, 200)
		},
		[onFileUploaded, showToast]
	)

	return { isUploading, uploadProgress, uploadFile }
}

export default useFileUpload
