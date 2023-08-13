import React, { useState, useEffect } from "react";
import ClientLayout from "../components/ClientLayout";
import CardNewsDesc from "../components/CardNewsDesc";
import { listArticleModify } from "../server/Api";
import { useLocation } from "react-router-dom";

const Category = () => {
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const { state } = useLocation();
  console.log(state.data.categoryId)

  useEffect(() => {
    let data = {
      KEY: state.data.categoryId,
      TOP: 5,
      TYPE: 3
    };
    listArticleModify(data).then((rs) => {
      // console.log(rs.data.data)
      if (rs.data.status) {
        setList(rs.data.data)
        // console.log(rs.data.data)
      }
    });
  }, [state.data.categoryId]);

  useEffect(() => {
    let data = {
      KEY: state.data.categoryId,
      TOP: 1,
      TYPE: 4
    };
    listArticleModify(data).then((rs) => {
      // console.log(rs.data.data)
      if (rs.data.status) {
        setList2(rs.data.data)
        // console.log(rs.data.data)
      }
    });
  }, [state.data.categoryId]);
  return (
    <div>
      <ClientLayout>
            <h3 className="mt-3 font-mono font-semibold text-3xl text-center text-transform: uppercase">{state.data.name}</h3>
        <div className="grid grid-rows-4 grid-cols-4 gap-2 mx-28 mt-3 mb-10 ">
          {/* LEFT MAIN */}
          <div className=" bg-[#fff] row-span-4 col-span-3 p-5">
            {list.length > 4 ? (
              <div className=" ">
                {/* TOP */}
                <div>
                  <div className="flex justify-between">
                    <div className="row-span-1 mb-10 col-span-2">
                      <CardNewsDesc data={list[0]} type="1" />
                    </div>
                    <div className="row-span-1 col-span-1">
                      <CardNewsDesc data={list[1]} type="4" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <CardNewsDesc data={list[2]} type="4" />
                    <CardNewsDesc data={list[3]} type="4" />
                    <CardNewsDesc data={list[4]} type="4" />
                  </div>
                </div>

              </div>
            ) : null}
            <hr className="my-5 border-primary" />
            <div className="grid grid-cols-1 gap-2">
              {list2.length > 0 &&
                list2.map((item, index) => (
                  <div className="row-span-1 col-span-1" key={index}>
                    <CardNewsDesc data={item} type="6" />
                  </div>
                ))}
            </div>
          </div>
          <div className="bg-[#fff] col-span-1">
            <img className="h-full" src="https://quangcaongoaitroi.com/wp-content/uploads/2019/09/the-gioi-di-dong-quang-cao-banner-1.jpg" alt="" />
          </div>
          <div className="bg-[#fff] col-span-1 ">
            <img className="h-full" src="https://quangcaongoaitroi.com/wp-content/uploads/2019/09/the-gioi-di-dong-quang-cao-banner-1.jpg" alt="" />
          </div>

        </div>
      </ClientLayout>
    </div>
  );
};

export default Category;
