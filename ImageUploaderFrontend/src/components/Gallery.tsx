import React from 'react'
import styled from 'styled-components'
import ImageItem from './ImageItem'

interface GalleryProps {
	images: ImageData[]
}

export interface ImageData {
	fileName: string
	filePath: string
	uploadDate: string
	resolution: string
}

interface GalleryProps {
	images: ImageData[]
	sortOption: string
	onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
	onDownload: (image: ImageData) => void
	onDelete: (image: ImageData) => void
}

const Gallery: React.FC<GalleryProps> = ({ images, sortOption, onSortChange, onDownload, onDelete }) => {
	const sortedImages = (images: ImageData[], sortOption: string): ImageData[] => {
		const imgs = [...images]
		switch (sortOption) {
			case 'nameAsc':
				imgs.sort((a, b) => a.fileName.localeCompare(b.fileName))
				break
			case 'nameDesc':
				imgs.sort((a, b) => b.fileName.localeCompare(a.fileName))
				break
			case 'dateNewest':
				imgs.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
				break
			case 'dateOldest':
				imgs.sort((a, b) => new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime())
				break
			default:
				imgs.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
				break
		}
		return imgs
	}

	return (
		<GalleryWrapper>
			<GalleryTitle>Lista obrazków</GalleryTitle>
			<SortContainer>
				<label htmlFor='sortSelect'>Sortuj według:</label>
				<select id='sortSelect' value={sortOption} onChange={onSortChange}>
					<option value='nameAsc'>Nazwa (rosnąco)</option>
					<option value='nameDesc'>Nazwa (malejąco)</option>
					<option value='dateNewest'>Data (najnowsze)</option>
					<option value='dateOldest'>Data (najstarsze)</option>
				</select>
			</SortContainer>
			<GalleryItems>
				{sortedImages(images, sortOption).map((img, index) => (
					<ImageItem key={index} image={img} onDownload={onDownload} onDelete={onDelete} />
				))}
			</GalleryItems>
		</GalleryWrapper>
	)
}
export default Gallery

const GalleryWrapper = styled.div`
	margin-top: 25px;
`

const GalleryTitle = styled.h2`
	margin-bottom: 15px;
	text-align: center;
	color: #313c4b;
`

const SortContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 10px;
`
const GalleryItems = styled.div`
	margin-top: 15px;
`
