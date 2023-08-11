import React, { useState } from "react";
import { updateProfile } from "../server/Api";
import uploadImg from "../utils/uploadImage";


const Profile = () => {
    const [showModal, setShowModal] = useState(true);
      const [updateValue, setUpdateValue] = useState({
        ID: null,
        NAME: JSON.parse(localStorage.getItem('user')).name,
        EMAIL: JSON.parse(localStorage.getItem('user')).email,
        ADDRESS: JSON.parse(localStorage.getItem('user')).address,
        GENDER: JSON.parse(localStorage.getItem('user')).gender,
        IMAGE: JSON.parse(localStorage.getItem('user')).image,
        PHONE: JSON.parse(localStorage.getItem('user')).phone,
      });
    
      const handleChange = (e) => {
        setUpdateValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
      };
  return (
    <div>
      {showModal ? (
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
                    Cập nhật thông tin 
                  </h3>
                  <form
                    class="bg-white  px-8 pt-6 pb-8 mb-4"
                  >
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="name"
                      >
                        Họ tên
                      </label>
                      <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                        name="NAME"
                        type="text"
                        placeholder="Họ tên"
                        value={updateValue.NAME}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="name"
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
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="name"
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
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="name"
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
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="GENDER"
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
    </div>
  )
}

export default Profile
