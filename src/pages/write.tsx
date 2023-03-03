import { HeadFC, navigate } from "gatsby"
import React, { useCallback } from "react"
import styled from "styled-components"
import Button from "../components/Button"
import Layout from "../components/Layout"

export default function () {
  const toggleForm = (form: HTMLFormElement, disable: boolean) => {
    const inputs = form.querySelectorAll("input")
    if (inputs) inputs.forEach((input) => (input.disabled = disable))

    const textarea = form.querySelector("textarea")
    if (textarea) textarea.disabled = disable
  }

  const onSubmitCallback = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    let allEntered = true

    formData.forEach((value) => {
      if (!value) allEntered = false
    })

    if (!allEntered) {
      alert("제목, 이름, 비밀번호, 내용을 모두 입력해 주세요.")
      return
    }

    const title = formData.get("title")
    const content = formData.get("content")

    if (title && title.toString().length > 100)
      alert(`제목이 너무 깁니다. (최대 100자, 현재 ${title.toString().length}자)`)
    else if (content && content.toString().length > 1500)
      alert(`글 내용이 너무 깁니다. (최대 1500자, 현재 ${content.toString().length}자)`)
    else {
      toggleForm(e.currentTarget, true)

      const body = new URLSearchParams()
      formData.forEach((value, key) => body.append(key, value.toString()))

      body.append("writeDate", new Date().toLocaleDateString("ko-KR"))

      fetch(`${process.env.GATSBY_API_URL}/blogs`, {
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body
      }).then((res) => {
        if (res.status === 500) {
          alert("서버에서 오류가 발생하였습니다.")
          toggleForm(e.currentTarget, false)
        } else if (res.status === 201) navigate("/")
      })
    }
  }

  const onSubmit = useCallback(onSubmitCallback, [])

  return (
    <Layout>
      <Form onSubmit={onSubmit}>
        <h1>글쓰기</h1>
        <div>
          <h3>제목</h3>
          <Input placeholder="글 제목 입력" name="title" required />
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 15 }}>
          <div>
            <h4>이름</h4>
            <Input placeholder="이름 입력" name="writer" required />
          </div>
          <div>
            <h4>비밀번호</h4>
            <Input type="password" placeholder="비밀번호 입력" name="password" required />
          </div>
        </div>
        <div>
          <h3>내용</h3>
          <Textarea placeholder="글 내용 입력" name="content" rows={6} required></Textarea>
        </div>
        <Button type="submit">글쓰기</Button>
      </Form>
    </Layout>
  )
}

const Form = styled.form`
  margin: 0;
  padding: 0;
  width: 100%;
  text-align: center;

  & div {
    text-align: left;
  }
`

const Input = styled.input`
  all: unset;
  text-align: left;
  border-bottom: 1.5px solid rgb(50, 50, 50);
  padding: 4px;
  margin: 2px;
  width: calc(100% - 8px);
  font-size: 15px;
`

const Textarea = styled.textarea`
  all: unset;
  font-size: 15px;
  border: 1.5px solid rgb(50, 50, 50);
  padding: 2px;
  width: calc(100% - 4px);
  margin: 2px;
`

export const Head: HeadFC = () => <title>Renoh Board - Write</title>
