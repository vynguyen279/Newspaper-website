import React, { useState, useEffect } from "react";
import { listCategory } from "../../server/Api";
import NavBar from "./NavBar";

const Footer = () => {
  const [list, setList] = useState([]);
  const [key, setKey] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
      let data = {
        KEY: key,
        STATUS: "true",
      };
      listCategory(data).then((rs) => {
        if (rs.data.status) {
          // console.log(rs.data.data)
          setList(rs.data.data)
        }
      });

  }, [key, status]);
  return (
    <>
      <NavBar data={list}/>
      <div className="w-full px-10 ">
        <div className="flex text-left flex-col mb-16 pt-5 pb-10">
          <h1 className="text-3xl font-bold text-secondary">
            .Daily<span className="text-3xl font-bold text-primary">News</span>
          </h1>
          <h3 className="text-xl mb-10">Khám phá những điều mới mẻ. Bạn đã biết?</h3>
          <p>
            Tạp chí điện tử Tri thức trực tuyến<br></br> Cơ quan chủ quản: Hội Xuất bản
            Việt Nam<br></br> Giấy phép báo chí: số 75/GP-BTTTT do Bộ Thông tin và Truyền
            thông cấp ngày 26/02/2020 <br></br>Phó tổng biên tập phụ trách: Lâm Quang
            Hiếu<br></br> © Toàn bộ bản quyền thuộc Tri thức trực tuyến
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
