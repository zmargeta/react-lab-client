import React from 'react'
import styled from 'styled-components'
import { BeatLoader } from 'react-spinners'

const StyledLoading = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`

const LoadingIndicator = () => (
  <StyledLoading>
    <BeatLoader color="#ffffff99" />
  </StyledLoading>
)

export default LoadingIndicator
