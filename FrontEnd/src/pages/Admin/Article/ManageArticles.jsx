import React, { useState, useEffect } from "react";
import ManagementLayout from "../../../components/ManagementLayout";
import { listArticle, listCategory } from "../../../server/Api";
import Table from './table'
import checkRole from "../../../utils/checkRole";

const ManageArticles = () => {
  checkRole()
  const [list, setList] = useState([]);
  const [key, setKey] = useState('');
  const [status, setStatus] = useState('');
  const [cate, setCate] = useState(null);
  const [list2, setList2] = useState([]);

  useEffect(() => {
    let data = {
      KEY: "",
      STATUS: "",
    };
      listCategory(data).then((rs) => {
        if(rs.data.status){
          setList2(rs.data.data)
        }
      });
  }, []);
  useEffect(() => {
    let data = {
      KEY: key,
      CATE: cate?cate:null,
      STATUS: status
    };
    listArticle(data).then((rs) => {
        if(rs.data.status){
          setList(rs.data.data)
        }
      });
  }, [key, status, cate]);
  return (
    <div>
      <ManagementLayout>
        <div className="bg-slate-200 w-full h-screen px-5 py-3 overflow-x-hidden">
          <h3 className="font-semibold text-xl text-left mb-3">
            Quản lý bài viết
          </h3>
          <div className="bg-white px-5 rounded-lg pb-5 pt-0 shadow-lg shadow-slate-500/20">
            <div className="grid grid-flow-row grid-cols-6 gap-3">
              <div class="flex justify-start items-center py-7 relative col-span-1">
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
              {/* CHUYEN MUC */}
              <div className="col-span-1 h-10 pt-7">
                <select
                  data-te-select-init
                  className="w-full py-2 h-10 px-2 border rounded border-gray-300 outline-none"
                  onChange={(e)=>setCate(e.target.value)}
                >
                  <option value="">Chuyên mục</option>
                  {list2&&list2.map((item,index)=>(
                    <option key={index} value={item.categoryId}>{item.name}</option>
                  ))}
                  {/* <option value="1">One</option> */}
                </select>
              </div>
              {/* Trạng thái */}
              <div className="col-span-1 h-10 pt-7">
                <select
                  data-te-select-init
                  data-te-select-filter="true"
                  className="w-full h-10 border rounded border-gray-300 outline-none"
                  onChange={(e)=>setStatus(e.target.value)}
                >
                  <option value="">Trạng thái</option>
                  <option value="Chờ duyệt">Chờ duyệt</option>
                  <option value="Đã duyệt">Đã duyệt</option>
                  <option value="Đã ẩn">Đã ẩn</option>
                  <option value="Chưa đạt">Chưa đạt</option>
                </select>
              </div>
              {/* DATE */}
              {/* <div date-rangepicker class="flex items-center col-span-2">
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input
                    name="start"
                    datepicker 
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date start"
                  />
                </div>
                <span class="mx-4 text-gray-500">to</span>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input
                    name="end"
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date end"
                  />
                </div>
              </div> */}
              {/* <button
                className="col-span-1 middle none mt-7 ml-3 w-20 h-10 center rounded-lg bg-[#4538c9] py-3 px-6 font-sans text-xs font-bold text-white shadow-sm shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40"
                data-ripple-light="true"
              >
                Lọc
              </button> */}
            </div>
            {/* TABLE */}
            <Table data={list}/>
          </div>
        </div>
      </ManagementLayout>
    </div>
  );
};

export default ManageArticles;
