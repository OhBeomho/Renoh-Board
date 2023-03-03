import { HeadFC, navigate, PageProps } from "gatsby";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Layout from "../components/Layout";
import LoadingCircle from "../components/LoadingCircle";
import "../styles/global.css";

interface PostData {
  title: string;
  writer: string;
  writeDate: string;
  content: string;
}

export default function (props: PageProps) {
  const postID = new URLSearchParams(props.location.search).get("id");
  const [postData, setPostData] = useState<PostData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${process.env.GATSBY_API_URL}/posts/${postID}`)
      .then((res) => {
        if (res.status === 500) throw new Error("Server error.");
        else if (res.status === 404) throw new Error("Post not found.");
        else if (res.status === 200) return res.json();
      })
      .then((data) => {
        setPostData(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
        setLoading(false);
      });
  }, []);

  const deletePostCallback = () => {
    const password = prompt("글의 비밀번호를 입력하세요.");
    if (!password) return;

    fetch(`${process.env.GATSBY_API_URL}/posts/${postID}/${password}`, { method: "delete" })
      .then((res) => {
        if (res.status === 500) alert("서버에서 오류가 발생하였습니다.");
        else if (res.status === 401) alert("비밀번호가 일치하지 않습니다.");
        else if (res.status === 200) navigate("/");
      })
      .catch((e) => console.error(e));
  };

  const deletePost = useCallback(deletePostCallback, []);

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
      <h1>{postData?.title}</h1>
      <Info>
        <div className="writer">{postData?.writer}</div>
        <div className="date">
          {new Date(String(postData?.writeDate)).toLocaleDateString("ko-KR")}
        </div>
      </Info>
      <hr />
      <Content>{postData?.content}</Content>
      <Button onClick={deletePost}>블로그 삭제</Button>
    </Layout>
  );
}

const Info = styled.div`
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
`;

const Content = styled.div`
  width: 100%;
  white-space: pre-wrap;
  word-break: break-all;
`;

export const Head: HeadFC = () => <title>Renoh Board - Post view</title>;
