import React from 'react'
import styled from 'styled-components'

const StyledLogo = styled.div`
  color: var(--color-primary);
  font-size: 1.25rem;
`

const Logo = () => (
  <StyledLogo>
    <strong>netflix</strong>
    <span>roulette</span>
  </StyledLogo>
)

export default Logo
