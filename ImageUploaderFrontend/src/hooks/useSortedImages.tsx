import { useMemo } from 'react'
import { ImageData } from '../types/imageTypes'

export const useSortedImages = (images: ImageData[], sortOption: string): ImageData[] => {
	return useMemo(() => {
		const sorted = [...images]
		switch (sortOption) {
			case 'nameAsc':
				sorted.sort((a, b) => a.fileName.localeCompare(b.fileName))
				break
			case 'nameDesc':
				sorted.sort((a, b) => b.fileName.localeCompare(a.fileName))
				break
			case 'dateNewest':
				sorted.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
				break
			case 'dateOldest':
				sorted.sort((a, b) => new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime())
				break
			default:
				sorted.sort((a, b) => a.fileName.localeCompare(b.fileName))
				break
		}
		return sorted
	}, [images, sortOption])
}
