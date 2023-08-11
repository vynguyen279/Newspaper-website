import React, { useState } from "react";
import formatDate from "../../../utils/formatDate";
import { checkComment, deleteComment } from "../../../server/Api";

const Table = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [lock, setLock] = useState("1");
  const [value2, setValue2] = useState({
    ID: ""
  });
  const [value, setValue] = useState({
    ID: "",
    STATUS: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    console.log(value);
    checkComment(value)
      .then((rs) => {
        if (rs.data.status) {
          alert(rs.data.message);
          setShowModal(false);
        } else alert(rs.data.message);
      })
      .catch(function (error) {
        alert(error);
      });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    // console.log(value);
    deleteComment(value2)
      .then((rs) => {
        if (rs.data.status) {
          alert(rs.data.message);
          setShowModal(false);
        } else alert(rs.data.message);
      })
      .catch(function (error) {
        alert(error);
      });
  };
  return (
    <div>
      <div class="flex flex-col">
        <table class="min-w-full text-left text-sm font-light">
          <thead class="font-medium bg-[#e1e7ff]">
            <tr>
              <th scope="col" class="px-6 py-4">
                #
              </th>
              <th scope="col" class="px-6 py-4">
                Id
              </th>
              <th scope="col" class="px-6 py-4">
                Nội dung
              </th>
              <th scope="col" class="px-6 py-4">
                Mã độc giả
              </th>
              <th scope="col" class="px-6 py-4">
                Bài viết
              </th>
              <th scope="col" class="px-6 py-4">
                Ngày đăng
              </th>
              <th scope="col" class="px-6 py-4">
                Ngày chỉnh sửa
              </th>
              <th scope="col" class="px-6 py-4">
                Trạng thái
              </th>
              <th scope="col" class="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="h-200 overflow-y-scroll">
            {data &&
              data.map((item, index) => (
                <tr
                  class="border-b transition duration-300 ease-in-out  border-slate-300"
                  key={index}
                >
                  <td class="whitespace-nowrap px-4 py-4 font-medium">
                    {index}
                  </td>
                  <td class="whitespace-nowrap px-4 py-4 font-semibold text-primary">
                    {item.commentId}
                  </td>
                  <td class="whitespace-wrap px-4 py-4">
                    {item.content}
                  </td>
                  <td class="whitespace-wrap px-4 py-4 font-normal">
                    {item.readerId}
                  </td>
                  <td class="whitespace-wrap px-4 py-4 font-normal">
                    {item.title}
                  </td>
                  <td class="whitespace-nowrap px-4 py-4 font-normal">
                    {formatDate(item.createdTime)}
                  </td>
                  <td class="whitespace-nowrap px-4 py-4 font-normal">
                    {formatDate(item.updatedTime)}
                  </td>
                  <td class="whitespace-nowrap px-4 py-4 font-normal">
                    {
                      item.status ? "Đã duyệt" : "Chờ duyệt"
                    }
                  </td>
                  {/* (localStorage.getItem('role')[0].roleId==1||localStorage.getItem('role')[0].roleId==2) */}
                  {
                    (JSON.parse(localStorage.getItem('role'))[0].roleId == 1 || JSON.parse(localStorage.getItem('role'))[0].roleId == 2) ? (item.status ? (<td class="whitespace-nowrap px-6 py-4 flex flex-row">
                      <div
                        className="bg-slate-100 hover:bg-slate-200 rounded-md p-2 cursor-pointer text-neutral-950 mr-3"
                        onClick={() => {
                          setValue((pre) => ({
                            ...pre,
                            ID: item.commentId,
                          }));
                          setValue((pre) => ({ ...pre, STATUS: "0" }));
                          setLock(1);
                          setShowModal(true);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                      </div>
                      {/* <div
                        className="bg-red-100 hover:bg-red-200 rounded-md p-2 cursor-pointer text-red-500 mr-3"
                      onClick={() => {
                        setValue2((pre) => ({
                          ...pre,
                          ID: item.commentId,
                        }));
                        setLock(3);
                        setShowModal(true);
                      }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>

                      </div> */}
                    </td>) : (<td class="whitespace-nowrap px-6 py-4 flex flex-row">
                      <div
                        className="bg-slate-100 hover:bg-slate-200 rounded-md p-2 cursor-pointer text-[#4438ca] mr-3"
                        onClick={() => {
                          setValue((pre) => ({
                            ...pre,
                            ID: item.commentId,
                          }));
                          setValue((pre) => ({ ...pre, STATUS: "1" }));
                          setLock(2);
                          setShowModal(true);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                      </div>
                      {/* <div
                        className="bg-red-100 hover:bg-red-200 rounded-md p-2 cursor-pointer text-red-500 mr-3"
                        onClick={() => {
                          setValue2((pre) => ({
                            ...pre,
                            ID: item.commentId,
                          }));
                          setLock(3);
                          setShowModal(true);
                      }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>

                      </div> */}
                    </td>)) : null
                  }

                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showModal && lock == '1' ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 sm:flex">
                  <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-red-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <h4 className="text-lg font-medium text-gray-800">
                      Bạn muốn ẩn bình luận này ?
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      Bình luận sau khi bị ẩn sẽ không thể hiển thị dưới bài viết.
                    </p>
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 hover:bg-red-700 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                        onClick={handleChange}
                      >
                        Ẩn
                      </button>
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                        onClick={() => setShowModal(false)}
                      >
                        Quay lại
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {showModal && lock == '2' ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 sm:flex">
                  <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>

                  </div>
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <h4 className="text-lg font-medium text-gray-800">
                      Bạn muốn duyệt bình luận này ?
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      Bình luận sau khi được duyệt sẽ được hiển thị dưới bài viết.
                    </p>
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md outline-none ring-offset-2  focus:ring-2"
                        onClick={handleChange}
                      >
                        Duyệt
                      </button>
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                        onClick={() => setShowModal(false)}
                      >
                        Quay lại
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {showModal && lock == '3' ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 sm:flex">
                  <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-red-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <h4 className="text-lg font-medium text-gray-800">
                      Bạn muốn xóa bình luận này ?
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      Bình luận sau khi bị xóa sẽ không thể khôi phục.
                    </p>
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md outline-none ring-offset-2  focus:ring-2"
                        onClick={handleDelete}
                      >
                        Xóa
                      </button>
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                        onClick={() => setShowModal(false)}
                      >
                        Quay lại
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Table;
