import React, { useState, useEffect } from "react";
import ManagementLayout from "../../../components/ManagementLayout";
import { listArticleForAuthor, listCategory } from "../../../server/Api";
import TableForAuthor from "./tableForAuthor";
import checkRole from "../../../utils/checkRole";

const ManageArticlesForAuthor = () => {
    checkRole()
    const [list, setList] = useState([]);
    const [listCate, setListCate] = useState([]);
    const [category, setCategory] = useState('0');
    const [status, setStatus] = useState('');
    const [article, setArticle] = useState('');

    useEffect(() => {
        let data = {
            ARTICLEID: article,
            STATUS: status,
            CATEGORYID: category,
            AUTHORID: JSON.parse(localStorage.getItem('user')).userId
        };
        listArticleForAuthor(data).then((rs) => {
            if (rs.data.status) {
                setList(rs.data.data)
            }
        });
    }, [category, status, article, list]);
    

  
    useEffect(() => {
      let data = {
        KEY: "",
        STATUS: "true",
      };
        listCategory(data).then((rs) => {
          if(rs.data.status){
            setListCate(rs.data.data)
          }else{
            alert(rs.data.message)
          }
        });
    }, []);
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
                                    onChange={(e)=>setArticle(e.target.value)}
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
                                    onChange={(e)=>setCategory(e.target.value)}
                                >
                                    <option value='0'>Chuyên mục</option>
                                    {listCate &&
                                        listCate.map((item, index) => (
                                            <option value={parseInt(item.categoryId)} key={index}>{item.name}</option>
                                        ))}
                                </select>
                            </div>
                            {/* DATE */}
                            <div className="col-span-1 h-10 pt-7">
                                <select
                                    data-te-select-init
                                    className="w-full py-2 h-10 px-2 border rounded border-gray-300 outline-none"
                                    name="status"
                                    onChange={(e)=>setStatus(e.target.value)}
                                >
                                    <option value="">Trạng thái</option>
                                    <option value="Đã duyệt">Đã duyệt</option>
                                    <option value="Chờ duyệt">Chờ duyệt</option>
                                    <option value="Bản nháp">Bản nháp</option>
                                    <option value="Đã ẩn">Đã ẩn</option>
                                    <option value="Chưa đạt">Chưa đạt</option>
                                </select>
                            </div>
                        </div>
                        {/* TABLE */}
                        <TableForAuthor data={list}/>
                    </div>
                </div>
            </ManagementLayout>
        </div>
    );
};

export default ManageArticlesForAuthor;
