import axios, { AxiosProgressEvent } from 'axios'
import { ImageData } from '../types/imageTypes'

const BASE_URL = 'http://localhost:5182'

// GET ALL IMAGES FROM API
export const fetchImages = async (): Promise<ImageData[]> => {
	const response = await axios.get(`${BASE_URL}/api/images`)
	return response.data
}

// DELETE IMAGE
export const deleteImage = async (id: number): Promise<void> => {
	await axios.delete(`${BASE_URL}/api/images/${id}`)
}

// GET IMAGE
export const downloadImage = async (filePath: string): Promise<Blob> => {
	const response = await axios.get(`${BASE_URL}${filePath}`, { responseType: 'blob' })
	return response.data
}

// POST IMAGE
export const uploadImages = async (
	formData: FormData,
	onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
): Promise<ImageData[]> => {
	const response = await axios.post(`${BASE_URL}/api/images/upload`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
		onUploadProgress,
	})
	return response.data
}
