import { Link } from "gatsby"
import React, { ReactNode } from "react"
import styled from "styled-components"

export default function (props: { children: ReactNode }) {
  return (
    <Wrapper>
      <header>
        <Navbar>
          <Link to="/" className="brand">
            Renoh Blog
          </Link>
          <div>
            <Link to="/write">글쓰기</Link>
          </div>
        </Navbar>
      </header>
      <Main>{props.children}</Main>
      <Footer>
        <p>Made by OhBeomho</p>
        <p>
          Source on <a href="https://github.com/OhBeomho/Renoh-Blog">GitHub</a>
        </p>
      </Footer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  box-shadow: 0 4px 8px -2px rgb(0, 0, 0, 0.2);

  & .brand {
    font-size: 25px;
    color: black;
  }
`

const Main = styled.main`
  margin: auto;
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`

const Footer = styled.footer`
  background-color: lightgray;
  text-align: center;
`
