import React, { useEffect, useState } from "react"
import { HeadFC, Link, PageProps } from "gatsby"
import LoadingCircle from "../components/LoadingCircle"
import Layout from "../components/Layout"
import styled from "styled-components"
import "../styles/global.css"
import LinkButton from "../components/LinkButton"

interface BlogData {
  _id: string
  title: string
  writeDate: string
  writer: string
}

export default function (props: PageProps) {
  const page = Number(new URLSearchParams(props.location.search).get("p") || 1)
  const [blogs, setBlogs] = useState<BlogData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)

    fetch(`${process.env.GATSBY_API_URL}/blogs?p=${page}`)
      .then((res) => {
        if (res.status === 500) throw new Error("Server error.")
        else if (res.status === 200) return res.json()
      })
      .then((data) => {
        setBlogs(data)
        setLoading(false)
      })
      .catch((e) => {
        console.error(e)
        setError(true)
        setLoading(false)
      })
  }, [page])

  const blogListItems = blogs.map((blog) => (
    <BlogListItem key={blog._id}>
      <BlogListItemLink to={`/blog?id=${blog._id}`}>
        <div className="title">{blog.title}</div>
        <div>{blog.writer}</div>
        <div className="date">{new Date(blog.writeDate).toLocaleDateString("ko-KR")}</div>
      </BlogListItemLink>
    </BlogListItem>
  ))

  return loading ? (
    <Layout>
      <LoadingCircle />
    </Layout>
  ) : error ? (
    <Layout>
      <h1>Renoh Blog</h1>
      <p>블로그를 불러오지 못했습니다.</p>
    </Layout>
  ) : (
    <Layout>
      <h1>Renoh Blog</h1>
      <hr />
      {blogListItems.length ? <BlogList>{blogListItems}</BlogList> : <p>블로그가 없습니다.</p>}
      <p style={{ textAlign: "center" }}>
        <LinkButton to={`/?p=${page - 1}`} disabled={page === 1}>
          이전 페이지
        </LinkButton>
        <b>{page}페이지</b>
        <LinkButton to={`/?p=${page + 1}`} disabled={!blogs.length}>
          다음 페이지
        </LinkButton>
      </p>
    </Layout>
  )
}

const BlogList = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 10px 0;
`

const BlogListItemLink = styled((props: any) => <Link {...props} />)`
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
  color: black;
  padding: 5px;
  border-radius: 10px;
  transition: all 0.2s;

  & .title {
    font-weight: bold;
    flex: 1;
  }

  & .date {
    color: gray;
  }

  &:hover {
    box-shadow: 0 0 0 1.5px rgba(0, 0, 0, 0.25);
    text-decoration: none;
  }
`

const BlogListItem = styled.li`
  padding: 0px;
  margin: 8px 0;
`

export const Head: HeadFC = () => <title>Renoh Blog - Home</title>
