import React, { useState } from "react";
import { lockAccount } from "../../../server/Api";
import formatDate from "../../../utils/formatDate";

const Table = ({data}) => {
  const [showModal, setShowModal] = useState(false);
  const [lock, setLock] = useState(false);
  const [value, setValue] = useState({
    email: "",
    status: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    console.log(value);
    lockAccount(value)
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
                Hình ảnh
              </th>
              <th scope="col" class="px-6 py-4">
                Họ tên
              </th>
              <th scope="col" class="px-6 py-4">
                Email
              </th>
              <th scope="col" class="px-6 py-4">
                Sđt
              </th>
              <th scope="col" class="px-6 py-4">
                Địa chỉ
              </th>
              <th scope="col" class="px-6 py-4">
                Giới tính
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
                    {item.userId}
                  </td>
                  <td class="whitespace-nowrap px-4 py-4">
                    <img
                      alt="image"
                      src={item.image}
                      className="w-12 h-12 rounded-full object-fill"
                    />
                  </td>
                  <td class="whitespace-nowrap px-4 py-4 font-normal">
                    {item.name}
                  </td>
                  <td class="whitespace-nowrap px-4 py-4 font-normal">
                    {item.email}
                  </td>
                  <td class="whitespace-nowrap px-4 py-4 font-normal">
                    {item.phone}
                  </td>
                  <td class="whitespace-nowrap px-4 py-4 font-normal">
                    {item.address}
                  </td>

                  <td class="whitespace-nowrap px-4 py-4 ">
                    {item.gender ? (
                      <span class="px-2 py-1 font-semibold leading-tight text-indigo-500 bg-indigo-100 rounded-md">
                        {" "}
                        Nam{" "}
                      </span>
                    ) : (
                      <span class="px-2 py-1 font-semibold leading-tight text-rose-500 bg-rose-100 rounded-md">
                        {" "}
                        Nữ{" "}
                      </span>
                    )}
                  </td>

                  <td class="whitespace-nowrap px-4 py-4 ">
                    {item.status ? (
                      <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-md">
                        {" "}
                        Đang hoạt động{" "}
                      </span>
                    ) : (
                      <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-md">
                        {" "}
                        Đã khóa{" "}
                      </span>
                    )}
                  </td>
                  {item.status ? (
                    <td class="whitespace-nowrap px-6 py-4 flex flex-row">
                      <div
                        className="bg-red-100 hover:bg-red-200 rounded-md p-2 cursor-pointer text-red-500 mr-3"
                        onClick={() => {
                          setValue((pre) => ({
                            ...pre,
                            email: item.email.trim(),
                          }));
                          setValue((pre) => ({ ...pre, status: "0" }));
                          setLock(true);
                          setShowModal(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                          />
                        </svg>
                      </div>
                    </td>
                  ) : (
                    <td class="whitespace-nowrap px-6 py-4 flex flex-row">
                      <div
                        className="bg-slate-100 hover:bg-slate-200 rounded-md p-2 cursor-pointer text-[#4438ca] mr-3"
                        onClick={() => {
                          setValue((pre) => ({
                            ...pre,
                            email: item.email,
                          }));
                          setValue((pre) => ({ ...pre, status: "1" }));
                          setLock(false);
                          setShowModal(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                          />
                        </svg>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showModal && lock ? (
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
                      Bạn muốn khóa tài khoản này ?
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      Tài khoản sau khi bị khóa sẽ không thể đăng nhập vào hệ
                      thống.
                    </p>
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 hover:bg-red-700 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                        onClick={handleChange}
                      >
                        Khóa
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
      {showModal && !lock ? (
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
                      Bạn muốn kích hoạt tài khoản này ?
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      Tài khoản sau khi được kích hoạt sẽ có thể đăng nhập vào
                      hệ thống.
                    </p>
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md outline-none ring-offset-2  focus:ring-2"
                        onClick={handleChange}
                      >
                        Kích hoạt
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
