import React from "react"
import styled, { keyframes } from "styled-components"

export default function () {
  return (
    <Wrapper>
      <LoadingText>Loading...</LoadingText>
      <LoadingCircle></LoadingCircle>
    </Wrapper>
  )
}

const loadingAnimation = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`

const Wrapper = styled.div`
  position: relative;
`

const LoadingText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const LoadingCircle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  border: 15px solid rgb(50, 50, 50);
  border-top-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${loadingAnimation} 0.8s infinite linear;
`
