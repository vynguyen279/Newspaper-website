import React, { useState, useEffect } from "react";
import ManagementLayout from "../../../components/ManagementLayout";
import { listAuthor } from "../../../server/Api";
import Table from './Table'
import checkRole from "../../../utils/checkRole";

const ManageAuthor = () => {
  checkRole()
  const [list, setList] = useState([]);
  const [key, setKey] = useState('');
  const [status, setStatus] = useState(null);
  const [gender, setGender] = useState(null);

  useEffect(() => {
    if(!status)
    setStatus(null)
    if(!gender)
    setGender(null)
    let data = {
      KEY: key,
      STATUS: status,
      GENDER: gender
    };
    listAuthor(data).then((rs) => {
        if(rs.data.status){
          setList(rs.data.data)
        }
      });
  }, [key, status, gender]);
  return (
    <div>
      <ManagementLayout>
        <div className="bg-slate-200 w-full h-screen px-5 py-3 overflow-x-hidden">
          <h3 className="font-semibold text-xl text-left mb-3">
            Quản lý tác giả
          </h3>
          <div className="bg-white px-5 rounded-lg pb-5 pt-0 shadow-lg shadow-slate-500/20">
            <div className="flex justify-between">
              <div class="flex justify-start items-center py-7 relative">
                <input
                  class="text-sm leading-none text-left text-gray-600 px-4 py-2 h-10 w-full border rounded border-gray-300 outline-none"
                  type="text"
                  placeholder="Search"
                  onChange={(e)=>setKey(e.target.value)}
                />
                <svg
                  class="absolute right-3 z-10 cursor-pointer"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
                    stroke="#4B5563"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21 21L15 15"
                    stroke="#4B5563"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              {/* GIOI TINH */}
              <div className="flex flex-row">
                <div className="h-10 pt-7 w-28">
                  <select
                    data-te-select-init
                    className="w-full py-2 h-10 px-2 border rounded border-gray-300 outline-none"
                    onChange={(e)=>setGender(e.target.value)}
                  >
                    <option value="">Tất cả</option>
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                  </select>
                </div>
                {/* TRANG THAI */}
                <div className="h-10 pt-7 ml-5 mr-3 w-40">
                  <select
                    data-te-select-init
                    data-te-select-filter="true"
                    className="w-full h-10 border rounded border-gray-300 outline-none"
                    onChange={(e)=>setStatus(e.target.value)}
                  >
                    <option value="">Tất cả</option>
                    <option value="1">Đang hoạt động</option>
                    <option value="0">Đã khóa</option>
                  </select>
                </div>
                {/* BUTTON */}
                {/* <button
                  className="middle none mt-7 ml-3 w-20 h-10 center rounded-lg bg-[#4538c9] py-3 px-6 font-sans text-xs font-bold text-white shadow-sm shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40"
                  data-ripple-light="true"
                >
                  Lọc
                </button> */}
              </div>
            </div>
            {/* TABLE */}
            <Table data={list}/>
          </div>
        </div>
      </ManagementLayout>
    </div>
  );
};

export default ManageAuthor;