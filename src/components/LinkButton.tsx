import { Link } from "gatsby"
import React, { ReactNode } from "react"
import styled from "styled-components"

interface LinkButtonProps {
  to: string
  disabled?: boolean
  children: ReactNode
}

export default function (props: LinkButtonProps) {
  return (
    <LinkButton to={props.to} className={props.disabled ? "disabled" : ""}>
      {props.children}
    </LinkButton>
  )
}

const LinkButton = styled((props: any) => <Link {...props} />)`
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
    text-decoration: none;
  }

  &.disabled {
    pointer-events: none;
    color: lightgray;
    background-color: rgb(70, 70, 70);
  }
`
