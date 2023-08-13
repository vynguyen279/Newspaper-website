import React, { useState, useEffect } from "react";
import CardNewsDesc from "../components/CardNewsDesc";
import { useLocation } from "react-router-dom";
import formatDate from "../utils/formatDate";
import ClientLayout from "../components/ClientLayout";
import { listArticleModify, findNameAuthor, findNameCategory } from "../server/Api";
import Comment from "./Comment/Comment";

const NewsDetail = () => {
  const { state } = useLocation();
  const [list, setList] = useState(null);
  const [list2, setList2] = useState(null);
  const [name, setName] = useState({
    category: "",
    author: ""
  });

  useEffect(() => {
    let data = {
      KEY: state.data.categoryId,
      TOP: 3,
      TYPE: 3
    };
    listArticleModify(data).then((rs) => {
      // console.log(rs.data.data)
      if (rs.data.status) {
        setList(rs.data.data)
        // console.log(rs.data.data)
      }
    })
    findNameAuthor({ID: state.data.authorId}).then((rs) => {
      // console.log(rs.data.data)
      if (rs.data.status) {
        setName((pre) => ({ ...pre, author: rs.data.data }));
        console.log(rs.data.data)
      }
    });
      findNameCategory({ID: state.data.categoryId}).then((rs) => {
      // console.log(rs.data.data)
      if (rs.data.status) {
        setName((pre) => ({ ...pre, category: rs.data.data }));
        // console.log(rs.data.data)
      }
    });
  }, []);
  useEffect(() => {
    let data = {
      KEY: "",
      TOP: 3,
      TYPE: 1
    };
    listArticleModify(data).then((rs) => {
      // console.log(rs.data.data)
      if (rs.data.status) {
        setList2(rs.data.data)
        // console.log(rs.data.data)
      }
    });
  }, []);
  return (
    <div>
      <ClientLayout>
        <div className="bg-white p-10 mx-48 mb-10">
          <div>
            <h3 className="font-extralight text-lg">{name.category}</h3>
            <h1 className="font-bold text-2xl">{state.data.title}</h1>
            <p className="font-bold text-primary my-2">
              {name.author} - <span className="font-normal text-black">{formatDate(state.data.checkedTime)}</span>
            </p>
          </div>


          {/* HTML CONTENT */}
          <div dangerouslySetInnerHTML={{ __html: state.data.content }} />

          <div className="mt-10">
          <hr className="border-slate-400 my-3" />
          <Comment />
          </div>

          {/* BOTTOM */}
          <hr className="border-slate-400 my-3" />
          {list && list.length > 2 ? (
            <div>
              <h3 className="font-bold text-lg mb-2">Tin cùng chuyên mục</h3>
              <div className="grid grid-cols-3 gap-2">
                <CardNewsDesc data={list[0]} type="4" />
                <CardNewsDesc data={list[1]} type="4" />
                <CardNewsDesc data={list[2]} type="4" />

              </div>
            </div>
          ) : null}
          <h3 className="font-bold text-lg my-5">Tin mới nhất</h3>
          {list2 && list2.length > 2 ? (
            <div>
              <CardNewsDesc data={list2[0]} type="6" />
              <hr className="border-zinc-200 my-3" />
              <CardNewsDesc data={list2[1]} type="6" />
              <hr className="border-zinc-200 my-3" />
              <CardNewsDesc data={list2[2]} type="6" />
            </div>
          ) : null}
        </div>
      </ClientLayout>
    </div>
  );
};

export default NewsDetail;
