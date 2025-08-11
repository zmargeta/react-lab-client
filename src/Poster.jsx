import React from 'react'
import styled from 'styled-components'
import unavailableUrl from './assets/unavailable.svg'

const StyledPoster = styled.div.attrs({ role: 'img' })`
  background-color: #dbdbdb;
  // prettier-ignore
  background-image: url("${(props) => props.$imageUrl ?? unavailableUrl}");
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${(props) => (props.$imageUrl ? 'cover' : '40%')};
  min-height: var(--poster-height);
  max-height: var(--poster-height);
  max-width: var(--poster-width);
  min-width: var(--poster-width);
`
const Poster = ({ imageUrl }) => <StyledPoster $imageUrl={imageUrl} />

export default Poster
