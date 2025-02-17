import styled from 'styled-components'
import ImageItem from './ImageItem'
import { ImageData } from '../types/imageTypes'
import useSortedImages from '../hooks/useSortedImages'

interface GalleryProps {
	images: ImageData[]
	sortOption: string
	onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
	onDownload: (image: ImageData) => void
	onDelete: (image: ImageData) => void
	onImageClick: (image: ImageData) => void
}

const Gallery: React.FC<GalleryProps> = ({ images, sortOption, onSortChange, onDownload, onDelete, onImageClick }) => {
	const sortedImages = useSortedImages(images, sortOption)

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
				{sortedImages.map((img, index) => (
					<ImageItem
						key={`${img.fileName}_${index}`}
						image={img}
						onDownload={onDownload}
						onDelete={onDelete}
						onImageClick={onImageClick}
					/>
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
