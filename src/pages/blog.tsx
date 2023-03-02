import { navigate, PageProps } from "gatsby"
import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import Button from "../components/Button"
import Layout from "../components/Layout"
import LoadingCircle from "../components/LoadingCircle"
import "../styles/global.css"

interface BlogData {
  title: string
  writer: string
  writeDate: string
  content: string
}

export default function (props: PageProps) {
  const blogID = new URLSearchParams(props.location.search).get("id")
  const [blog, setBlog] = useState<BlogData>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`${process.env.GATSBY_API_URL}/blogs/${blogID}`)
      .then((res) => {
        if (res.status === 500) throw new Error("Server error.")
        else if (res.status === 404) throw new Error("Blog not found.")
        else if (res.status === 200) return res.json()
      })
      .then((data) => {
        setBlog(data)
        setLoading(false)
      })
      .catch((e) => {
        console.error(e)
        setError(true)
        setLoading(false)
      })
  }, [])

  const deleteBlogCallback = () => {
    const password = prompt("블로그의 비밀번호를 입력하세요.")
    if (!password) return

    fetch(`${process.env.GATSBY_API_URL}/blogs/${blogID}/${password}`, { method: "delete" })
      .then((res) => {
        if (res.status === 500) alert("서버에서 오류가 발생하였습니다.")
        else if (res.status === 401) alert("비밀번호가 일치하지 않습니다.")
        else if (res.status === 200) navigate("/")
      })
      .catch((e) => console.error(e))
  }

  const deleteBlog = useCallback(deleteBlogCallback, [])

  return loading ? (
    <Layout>
      <LoadingCircle></LoadingCircle>
    </Layout>
  ) : error ? (
    <Layout>
      <h1>오류 발생</h1>
      <p>블로그를 불러오지 못했습니다.</p>
    </Layout>
  ) : (
    <Layout>
      <h1>{blog?.title}</h1>
      <BlogInfo>
        <div className="writer">{blog?.writer}</div>
        <div className="date">{new Date(String(blog?.writeDate)).toLocaleDateString("ko-KR")}</div>
      </BlogInfo>
      <hr />
      <BlogContent>{blog?.content}</BlogContent>
      <Button onClick={deleteBlog}>블로그 삭제</Button>
    </Layout>
  )
}

const BlogInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .writer {
    font-weight: bold;
  }

  & .date {
    color: gray;
  }
`

const BlogContent = styled.div`
  width: 100%;
  white-space: pre-wrap;
  word-break: break-all;
`
