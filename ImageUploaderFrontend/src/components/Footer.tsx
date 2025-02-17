import React from 'react'
import styled from 'styled-components'

const Footer: React.FC = () => {
	return (
		<FooterWrapper>
			All rights reserved. Coded with ❤️ by{' '}
			<StyledLink href='https://github.com/maciejnarejko' target='_blank' rel='noopener noreferrer'>
				Maciej Narejko
			</StyledLink>
		</FooterWrapper>
	)
}

export default Footer

const FooterWrapper = styled.footer`
	margin-bottom: 5px;
	margin-top: 15px;
	padding: 0px 15px;
	text-align: center;
	font-size: 15px;
	font-weight: 400;
	color: #666;
	text-decoration: none;
`

const StyledLink = styled.a`
	text-decoration: underline;
	color: inherit;
`
