import { ImageData } from '../types/imageTypes'

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
