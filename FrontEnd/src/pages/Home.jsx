import React, { useState, useEffect } from "react";
import ClientLayout from "../components/ClientLayout";
import CardNewsDesc from "../components/CardNewsDesc";
import { listArticleModify } from "../server/Api";

const Home = () => {
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);

  useEffect(() => {
    let data = {
      KEY: "",
      TOP: 5,
      TYPE: 1
    };
    listArticleModify(data).then((rs) => {
      // console.log(rs.data.data)
      if (rs.data.status) {
        setList(rs.data.data)
        // console.log(rs.data.data)
      }
    });
  }, []);

  useEffect(() => {
    let data = {
      KEY: "",
      TOP: 5,
      TYPE: 2
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
    <ClientLayout>
      <div className="grid grid-rows-4 grid-cols-4 gap-2 mx-28 mt-3 mb-10 ">
        {/* LEFT MAIN */}
        <div className=" bg-[#fff] row-span-4 col-span-3 p-5">
        {list.length > 0 ? (
            <div className=" ">
              {/* TOP */}
              <div>
                <div className="flex ">
                  <div className="mr-20 mb-10 ">
                    <CardNewsDesc data ={list[0]} type="1" />
                  </div>
                  <div className="">
                    <CardNewsDesc data ={list[1]} type="1" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <CardNewsDesc data ={list[2]} type="4" />
                  <CardNewsDesc data ={list[3]} type="4" />
                  <CardNewsDesc data ={list[4]} type="4" />
                </div>
              </div>

            </div>
          ):<><></></>}
              <hr className="my-5 border-primary" /> 
              <div className="grid grid-cols-1 gap-2">
              {list2 &&
              list2.map((item, index) => (
                <div className="row-span-1 col-span-1" key={index}>
                  <CardNewsDesc data ={item} type="6" />
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
  );
};

export default Home;
