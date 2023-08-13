import React, { useState } from "react";
import { addCategory, updateCategory, deleteCategory } from "../../../server/Api";

const Table = ({ data, setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalDel, setShowModalDel] = useState(false);
  const [update, setUpdate] = useState(false);
  const [ID, setID] = useState(0);
  const [newValue, setNewValue] = useState({
    NAME: "",
    CREATEDEMPLOYEE: JSON.parse(localStorage.getItem('user')).userId,
  });
  const [delValue, setDelValue] = useState({
    ID: ""
  });
  const [updateValue, setUpdateValue] = useState({
    NAME: "",
    STATUS: "true",
    ID: 0,
    UPDATEDEMPLOYEE: JSON.parse(localStorage.getItem('user')).userId,
  });

  const handleChange = (e) => {
    setUpdateValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    setNewValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addCategory(newValue)
      .then((rs) => {
        if (rs.data.status) {
          alert(rs.data.message);
          setData([...data, rs.data.data])
          setShowModal(false);
        } else alert(rs.data.message);
      })
      .catch(function (error) {
        alert(error);
      });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    // console.log(delValue)
    deleteCategory(delValue)
      .then((rs) => {
        setData([...data])
          alert(rs.data.message);
          setShowModalDel(false);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateCategory(updateValue)
      .then((rs) => {
        if (rs.data.status) {
          setData([...data, rs.data.data])
          setShowModal(false);
          setUpdate(false)
          alert(rs.data.message);
        } else alert(rs.data.message);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <div>
      <div class="flex flex-col">
        <button
          onClick={() => {
            setShowModal(true);
            setUpdate(false);
          }}
          className="w-20 mb-2 p-2 text-white bg-indigo-700 rounded-md outline-none ring-offset-2 hover:bg-indigo-800 focus:ring-2"
        >
          Thêm
        </button>
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
                Chuyên mục
              </th>
              <th scope="col" class="px-6 py-4">
                Thời gian cập nhật
              </th>
              <th scope="col" class="px-6 py-4">
                Nhân viên cập nhật
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
                  <td class="whitespace-nowrap px-6 py-4 font-medium">
                    {index}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 font-semibold text-primary">
                    {item.categoryId}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 font-normal">
                    {item.name}
                  </td>
                  {item.updatedTime ? (
                    <td class="whitespace-nowrap px-6 py-4 font-normal">
                      {item.updatedTime}
                    </td>
                  ) : (
                    <td class="whitespace-nowrap px-6 py-4 font-normal text-red-600">
                      Chưa cập nhật
                    </td>
                  )}
                  {item.updatedEmployee ? (
                    <td class="whitespace-nowrap px-6 py-4 font-normal">
                      {item.updatedEmployee}
                    </td>
                  ) : (
                    <td class="whitespace-nowrap px-6 py-4 font-normal text-red-600">
                      Chưa cập nhật
                    </td>
                  )}
                  <td class="whitespace-nowrap px-6 py-4 ">
                    {item.status ? (
                      <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-md">
                        {" "}
                        Hiện hành{" "}
                      </span>
                    ) : (
                      <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-md">
                        {" "}
                        Ngừng sử dụng{" "}
                      </span>
                    )}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 flex flex-row">
                    <div
                      className="bg-slate-100 hover:bg-slate-200 rounded-md p-2 cursor-pointer text-[#4438ca] mr-3"
                      onClick={() => {
                        setUpdateValue((pre) => ({
                          ...pre,
                          ID: item.categoryId,
                        }));
                        setUpdateValue((pre) => ({ ...pre, NAME: item.name }));
                        setUpdateValue((pre) => ({
                          ...pre,
                          STATUS: item.status,
                        }));
                        setUpdate(true);
                        setShowModal(true);
                      }}
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
                    <div
                      className="bg-slate-100 hover:bg-slate-200 rounded-md p-2 cursor-pointer text-red-600 mr-3"
                      onClick={() => {
                        setDelValue((pre) => ({ ...pre, ID: item.categoryId }))
                        setShowModalDel(true)
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>

                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showModal && !update ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-80 max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3">
                  <h3 className="font-bold text-black text-xl">
                    Thêm chuyên mục
                  </h3>
                  <form
                    onSubmit={handleAdd}
                    class="bg-white  px-8 pt-6 pb-8 mb-4"
                  >
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="name"
                      >
                        Tên chuyên mục
                      </label>
                      <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                        name="NAME"
                        type="text"
                        placeholder="Tên chuyên mục"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex">
                      <button className="w-full mt-2 p-2.5 mr-2  text-white bg-indigo-700 rounded-md outline-none ring-offset-2 hover:bg-indigo-800 focus:ring-2">
                        Thêm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {showModal && update ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-80 max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3">
                  <h3 className="font-bold text-black text-xl">
                    Cập nhật chuyên mục
                  </h3>
                  <form
                    onSubmit={handleUpdate}
                    class="bg-white  px-8 pt-6 pb-8 mb-4"
                  >
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="name"
                      >
                        Tên chuyên mục
                      </label>
                      <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                        name="NAME"
                        type="text"
                        placeholder="Tên chuyên mục"
                        value={updateValue.NAME}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="STATUS"
                      >
                        Trạng thái
                      </label>
                      <select
                        data-te-select-init
                        name="STATUS"
                        className="w-full py-2 h-10 px-2 border rounded border-gray-300 outline-none"
                        value={updateValue.STATUS}
                        onChange={handleChange}
                      >
                        <option value="true">Hiện hành</option>
                        <option value="false">Ngừng sử dụng</option>
                      </select>
                    </div>
                    <div className="flex">
                      <button className="w-full mt-2 p-2.5 mr-2  text-white bg-indigo-700 rounded-md outline-none ring-offset-2 hover:bg-indigo-800 focus:ring-2">
                        Cập nhật
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {showModalDel? (
        <>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModalDel(false)}
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
                      Bạn muốn xóa chuyên mục này?
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      Chuyên mục sau khi xóa sẽ không thể khôi phục!
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
                        onClick={() => setShowModalDel(false)}
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
