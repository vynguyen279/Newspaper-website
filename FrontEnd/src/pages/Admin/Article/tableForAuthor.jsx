import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { lockAccount } from "../../../server/Api";
import formatDate from "../../../utils/formatDate";

const TableForAuthor = ({ data }) => {
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
                Tên bài viết
              </th>
              <th scope="col" class="px-6 py-4">
                Chuyên mục
              </th>
              <th scope="col" class="px-6 py-4">
                Ngày tạo
              </th>
              <th scope="col" class="px-6 py-4">
                Ngày kiểm duyệt
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
                    {item.articleId}
                  </td>
                  <td class="whitespace-nowrap px-4 py-4">
                    <img
                      alt="image"
                      src={item.image}
                      className="w-12 h-12 rounded-full object-fill"
                    />
                  </td>
                  <td class="whitespace-wrap px-4 py-4 font-normal">
                    {item.title}
                  </td>
                  <td class="whitespace-nowrap px-4 py-4 font-normal">
                    {item.name}
                  </td>
                  <td class="whitespace-nowrap px-4 py-4 font-normal">
                    {formatDate(item.createdTime)}
                  </td>
                  <td class="whitespace-nowrap px-4 py-4 font-normal">
                    {formatDate(item.checkedTime)}
                  </td>
                  <td class="whitespace-nowrap px-4 py-4 font-normal">
                    {item.status}
                  </td>
                  <td class="whitespace-nowrap px-4 py-4 font-normal">
                    <Link to={`/manage/edit`}
                      state={{ data: item }}
                      key={index}>
                      <div
                        className="bg-slate-100 hover:bg-slate-200 rounded-md p-2 cursor-pointer text-[#4438ca] mr-3"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </div>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default TableForAuthor;
