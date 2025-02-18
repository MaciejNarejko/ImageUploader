import axios, { AxiosProgressEvent } from 'axios'
import { ImageData } from '../types/imageTypes'
import { API_URL } from '../apiConfig'

// GET ALL IMAGES FROM API
export const fetchImages = async (): Promise<ImageData[]> => {
	const response = await axios.get(`${API_URL}/api/images`)
	return response.data
}

// DELETE IMAGE
export const deleteImage = async (id: number): Promise<void> => {
	await axios.delete(`${API_URL}/api/images/${id}`)
}

// GET IMAGE
export const downloadImage = async (filePath: string): Promise<Blob> => {
	const response = await axios.get(`${API_URL}${filePath}`, { responseType: 'blob' })
	return response.data
}

// POST IMAGE
export const uploadImages = async (
	formData: FormData,
	onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
): Promise<ImageData[]> => {
	const response = await axios.post(`${API_URL}/api/images/upload`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
		onUploadProgress,
	})
	return response.data
}
