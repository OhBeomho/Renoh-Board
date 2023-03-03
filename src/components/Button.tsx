import React, { ReactNode } from "react"
import styled from "styled-components"

export default function (props: {
  children: ReactNode
  onClick?: ((e: any) => any) | ((e: any) => void)
  disabled?: boolean,
  type?: string
}) {
  return (
    <Button disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </Button>
  )
}

const Button = styled.button`
  all: unset;
  padding: 4px;
  margin: 4px;
  color: white;
  background-color: rgb(50, 50, 50);
  border-radius: 10px;
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: rgb(90, 90, 90);
  }
`
