import React from 'react'
import styled from 'styled-components'
import Footer from './Footer'

const LayoutWrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-self: stretch;
	width: 100%;
	max-width: 900px;
	padding: 20px 15px;
`

const MainContent = styled.main`
	margin-bottom: 10px;
`

interface LayoutProps {
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<LayoutWrapper>
			<MainContent>{children}</MainContent>
			<Footer />
		</LayoutWrapper>
	)
}

export default Layout
