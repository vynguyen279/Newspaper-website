import React, { useState } from "react";
import { addEmployee, updateEmployee } from "../../../server/Api";
import formatDate from "../../../utils/formatDate";
import uploadImg from "../../../utils/uploadImage";

const Table = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState(true);
  const [ID, setID] = useState(0);
  const [newValue, setNewValue] = useState({
    ROLEID: 1,
    PASSWORD: "12345678",
    CREATEDUSER: JSON.parse(localStorage.getItem('user')).userId,
    NAME: "",
    EMAIL: "",
    ADDRESS: "",
    GENDER: "true",
    IMAGE: "",
    PHONE: "",
    STATUS: "true",
    STARTWORKINGDATE: "",
  });
  const [updateValue, setUpdateValue] = useState({
    ROLEID: 1,
    ID: 1,
    NAME: "",
    EMAIL: "",
    ADDRESS: "",
    GENDER: "true",
    IMAGE: "",
    PHONE: "",
    STATUS: "true",
    STARTWORKINGDATE: "",
  });

  const handleChange = async (e) => {
    setNewValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    setNewValue((pre) => ({ ...pre, ROLEID: parseInt(e.target.value) }));
    setUpdateValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    setUpdateValue((pre) => ({ ...pre, ROLEID: parseInt(e.target.value) }));

  };
  const handleImage = async (e) => {
    if (e.target.files[0]) {
      let img = await uploadImg(e.target.files[0])
      setNewValue((pre) => ({ ...pre, IMAGE: img }));
      setUpdateValue((pre) => ({ ...pre, IMAGE: img }));
    }

  };

  const handleAdd = (e) => {
    e.preventDefault();
    // console.log(newValue)
    addEmployee(newValue)
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

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(updateValue)
    updateEmployee(updateValue)
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
                Ngày bắt đầu làm
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
                  <td class="whitespace-nowrap px-4 py-4 font-normal">
                    {item.startWorkingDate}
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
                  <td class="whitespace-nowrap px-4 py-4 flex flex-row">
                    <div
                      className="bg-slate-100 hover:bg-slate-200 rounded-md p-2 cursor-pointer text-[#4438ca] mr-3"
                      onClick={() => {
                        setUpdateValue((pre) => ({
                          ...pre,
                          ID: item.userId,
                        }));
                        // console.log(String(formatDate(item.startWorkingDate)))
                        setUpdateValue((pre) => ({ ...pre, NAME: item.name }));
                        setUpdateValue((pre) => ({ ...pre, EMAIL: item.email.trim() }));
                        setUpdateValue((pre) => ({ ...pre, PHONE: item.phone }));
                        setUpdateValue((pre) => ({ ...pre, GENDER: item.gender }));
                        setUpdateValue((pre) => ({ ...pre, STATUS: item.status }));
                        setUpdateValue((pre) => ({ ...pre, ROLEID: item.roleId }));
                        setUpdateValue((pre) => ({ ...pre, IMAGE: item.image }));
                        setUpdateValue((pre) => ({ ...pre, STARTWORKINGDATE: String(formatDate(item.startWorkingDate)) }));
                        setUpdateValue((pre) => ({ ...pre, ADDRESS: item.address }));
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
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3">
                  <h3 className="font-bold text-black text-xl mb-5">
                    Thêm nhân viên
                  </h3>
                  <form
                    onSubmit={handleAdd}
                    class="bg-white  px-8 pt-6 pb-8 mb-4"
                    className="flex justify-center"
                  >
                    <div className="mr-5 flex-1">
                      <div class="mb-4">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="name"
                        >
                          Tên nhân viên
                        </label>
                        <input
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                          name="NAME"
                          type="text"
                          placeholder="Tên nhân viên"
                          onChange={handleChange}
                        />
                      </div>
                      <div class="mb-6">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="user"
                        >
                          Email
                        </label>
                        <input
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                          name="EMAIL"
                          type="text"
                          placeholder="Email"
                          onChange={handleChange}
                        />
                      </div>
                      <div class="mb-6">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="user"
                        >
                          Sđt
                        </label>
                        <input
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                          name="PHONE"
                          type="text"
                          placeholder="Số điện thoại"
                          onChange={handleChange}
                        />
                      </div>
                      <div class="mb-6">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="user"
                        >
                          Địa chỉ
                        </label>
                        <textarea
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                          name="ADDRESS"
                          type="text"
                          placeholder="Địa chỉ"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div class="mb-6">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="user"
                        >
                          Hình ảnh
                        </label>
                        <input
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                          name="IMAGE"
                          type="file"
                          placeholder="Email"
                          onChange={handleImage}
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="STATUS"
                        >
                          Giới tính
                        </label>
                        <select
                          data-te-select-init
                          name="GENDER"
                          className="w-full py-2 h-10 px-2 border rounded border-gray-300 outline-none"
                          onChange={handleChange}
                        >
                          <option value="true">Nam</option>
                          <option value="false">Nữ</option>
                        </select>
                      </div>
                      <div class="mb-6">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="user"
                        >
                          Ngày bắt đầu làm
                        </label>
                        <input
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                          name="STARTWORKINGDATE"
                          type="date"
                          placeholder="Chọn ngày"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="STATUS"
                        >
                          Chức vụ
                        </label>
                        <select
                          data-te-select-init
                          name="ROLEID"
                          className="w-full py-2 h-10 px-2 border rounded border-gray-300 outline-none"
                          onChange={handleChange}
                        >
                          <option value={1}>Quản lý</option>
                          <option value={2}>Nhân viên</option>
                        </select>
                      </div>
                      <div className="mb-6">
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
                          onChange={handleChange}
                        >
                          <option value="true">Kích hoạt</option>
                          <option value="false">Khóa</option>
                        </select>
                      </div>
                    </div>
                  </form>
                  <button className="w-full mt-2 p-2.5 mr-2  text-white bg-indigo-700 rounded-md outline-none ring-offset-2 hover:bg-indigo-800 focus:ring-2" onClick={handleAdd}>
                    Thêm
                  </button>
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
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3">
                  <h3 className="font-bold text-black text-xl mb-5">
                    Cập nhật nhân viên
                  </h3>
                  <form
                    class="bg-white  px-8 pt-6 pb-8 mb-4"
                    className="flex justify-center"
                  >
                    <div className="mr-5 flex-1">
                      <div class="mb-4">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="name"
                        >
                          Tên nhân viên
                        </label>
                        <input
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                          name="NAME"
                          type="text"
                          value={updateValue.NAME}
                          placeholder="Tên nhân viên"
                          onChange={handleChange}
                        />
                      </div>
                      <div class="mb-6">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="user"
                        >
                          Email
                        </label>
                        <input
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                          name="EMAIL"
                          type="text"
                          placeholder="Email"
                          value={updateValue.EMAIL}
                          onChange={handleChange}
                        />
                      </div>
                      <div class="mb-6">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="user"
                        >
                          Sđt
                        </label>
                        <input
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                          name="PHONE"
                          type="text"
                          placeholder="Số điện thoại"
                          value={updateValue.PHONE}
                          onChange={handleChange}
                        />
                      </div>
                      <div class="mb-6">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="user"
                        >
                          Địa chỉ
                        </label>
                        <textarea
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                          name="ADDRESS"
                          type="text"
                          placeholder="Địa chỉ"
                          value={updateValue.ADDRESS}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div class="mb-6">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="user"
                        >
                          Hình ảnh
                        </label>
                        <input
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                          name="IMAGE"
                          type="file"
                          placeholder="Email"
                          // value={updateValue.IMAGE}
                          onChange={handleImage}
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="STATUS"
                        >
                          Giới tính
                        </label>
                        <select
                          data-te-select-init
                          name="GENDER"
                          className="w-full py-2 h-10 px-2 border rounded border-gray-300 outline-none"
                          value={updateValue.GENDER}
                          onChange={handleChange}
                        >
                          <option value="true">Nam</option>
                          <option value="false">Nữ</option>
                        </select>
                      </div>
                      <div class="mb-6">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="user"
                        >
                          Ngày bắt đầu làm
                        </label>
                        <input
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                          name="STARTWORKINGDATE"
                          type="date"
                          placeholder="Chọn ngày"
                          value={updateValue.STARTWORKINGDATE}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="STATUS"
                        >
                          Chức vụ
                        </label>
                        <select
                          data-te-select-init
                          name="ROLEID"
                          className="w-full py-2 h-10 px-2 border rounded border-gray-300 outline-none"
                          value={updateValue.ROLEID}
                          onChange={handleChange}
                        >
                          <option value={1}>Quản lý</option>
                          <option value={2}>Nhân viên</option>
                        </select>
                      </div>
                      <div className="mb-6">
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
                          <option value="true">Kích hoạt</option>
                          <option value="false">Khóa</option>
                        </select>
                      </div>
                    </div>
                  </form>
                  <button className="w-full mt-2 p-2.5 mr-2  text-white bg-indigo-700 rounded-md outline-none ring-offset-2 hover:bg-indigo-800 focus:ring-2" onClick={handleUpdate}>
                    Cập nhật
                  </button>
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
