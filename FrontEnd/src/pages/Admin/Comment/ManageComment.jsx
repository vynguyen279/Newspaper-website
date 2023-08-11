import React, { useState, useEffect } from "react";
import ManagementLayout from '../../../components/ManagementLayout'
import { listComment } from '../../../server/Api'
import checkRole from "../../../utils/checkRole";
import Table from './Table'

const ManageComment = () => {
  checkRole()
  const [list, setList] = useState([]);
  const [key, setKey] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let data1 = {
      KEY: key,
      STATUS: status,
    };
    let data2 = {
      KEY: localStorage.getItem('role')[0].userId,
      STATUS: 1,
    };
    if(JSON.parse(localStorage.getItem('role'))[0].roleId===3){
      console.log("data2: ",data2)
      console.log(JSON.parse(localStorage.getItem('role'))[0].roleId)
      listComment(data2).then((rs) => {
        if(rs.data.status){
          setList(rs.data.data)
        }
      });
    } else{
      console.log("data1: ",data1)
      console.log(JSON.parse(localStorage.getItem('role'))[0].roleId)
      listComment(data1).then((rs) => {
        if(rs.data.status){
          setList(rs.data.data)
        }
      });
    }
  }, [key, status]);
  return (
    <div>
      <ManagementLayout>
        <div className="bg-slate-200 w-full h-screen px-5 py-3 overflow-x-hidden">
          <h3 className="font-semibold text-xl text-left mb-3">
            Quản lý bình luận
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
              {/* Tác giả */}
              {
                JSON.parse(localStorage.getItem('role'))[0].roleId != 3?(              <div className="col-span-1 h-10 pt-7">
                <select
                  data-te-select-init
                  data-te-select-filter="true"
                  className="w-full h-10 border rounded border-gray-300 outline-none"
                  onChange={(e)=>setStatus(e.target.value)}
                >
                  <option value=''>Trạng thái</option>
                  <option value="1">Đã duyệt</option>
                  <option value="0">Chờ duyệt</option>
                </select>
              </div>):null
              }
              {/* DATE */}
            </div>
            {/* TABLE */}
            <Table data={list}/>
          </div>
        </div>
      </ManagementLayout>
    </div>
  );
};

export default ManageComment;
