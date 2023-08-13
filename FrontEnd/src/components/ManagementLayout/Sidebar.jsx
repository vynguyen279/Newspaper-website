import React, { useState } from "react";
import { updateProfile, changePassword } from "../../server/Api";
import uploadImg from "../../utils/uploadImage";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const [check, setCheck] = useState(false);
  const history = useNavigate();
  const [updateValue, setUpdateValue] = useState({
    ID: JSON.parse(localStorage.getItem('user')).userId,
    NAME: JSON.parse(localStorage.getItem('user')).name,
    EMAIL: JSON.parse(localStorage.getItem('user')).email,
    ADDRESS: JSON.parse(localStorage.getItem('user')).address,
    GENDER: JSON.parse(localStorage.getItem('user')).gender,
    IMAGE: JSON.parse(localStorage.getItem('user')).image,
    PHONE: JSON.parse(localStorage.getItem('user')).phone,
  });
  const [updatePass, setUpdatePass] = useState({
    EMAIL: JSON.parse(localStorage.getItem('user')).email,
    PASSWORD: "",
    NEWPASSWORD: "",
    REPASSWORD: ""
  });

  const handleChange = async (e) => {
    if (!check) {
      setUpdateValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
      if (e.target.files[0].name) {
        const image = await uploadImg(e.target.files[0])
        // console.log(image)
        setUpdateValue((pre) => ({ ...pre, IMAGE: image }));
      }
    } else
      setUpdatePass((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // console.log(updateValue)
    updateProfile(updateValue)
      .then((rs) => {
        if (rs.data.status) {
          setShowModal(false);
          alert(rs.data.message);
          let dataUser = JSON.parse(localStorage.getItem('user'));
          console.log(dataUser)
          let obj = { ...dataUser, image: updateValue.IMAGE };
          let obj2 = { ...obj, name: updateValue.NAME };
          localStorage.setItem('user', JSON.stringify(obj2));
          // console.log(localStorage.getItem('user'))
          // window.location.reload()
        } else alert(rs.data.message);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const handleClickLogout = () => {
    localStorage.clear()
    localStorage.setItem('user', JSON.stringify({}))
    history("/", { replace: true })
  }
  const handlePassword = (e) => {
    e.preventDefault();
    console.log(updatePass)
    changePassword(updatePass)
      .then((rs) => {
        if (rs.data.status) {
          setShowModal(false);
          setUpdatePass((pre) => ({ ...pre, PASSWORD: '' }));
          setUpdatePass((pre) => ({ ...pre, NEWPASSWORD: '' }));
          setUpdatePass((pre) => ({ ...pre, REPASSWORD: '' }));
          alert(rs.data.message);
        } else alert(rs.data.message);
      })
      .catch(function (error) {
        alert(error);
      });
  }

  return (
    <aside class="flex flex-col w-60 h-screen px-4 py-8 overflow-y-hidden shadow-sm bg-white ">
      <a href="#">
        <h1 className="text-3xl font-bold text-secondary">
          .Daily<span className="text-3xl font-bold text-primary">News</span>
        </h1>
      </a>
      <hr class="my-6 w-[90%] border-y-stone-300" />
      {JSON.parse(localStorage.getItem('role'))[0].roleId == 3 ? (<div>  <Link to="/article/new">
        <button class="inline-flex w-[80%] items-center justify-center px-4 py-3 bg-primary hover:shadow-lg hover:shadow-black/20 duration-150 transform transition-shadow hover:dark:shadow-black/40 text-gray-800 text-base font-medium rounded-3xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
          Bài viết mới
        </button>
      </Link>
      
        <a
          class="flex items-center px-4 py-3 w-[90%] text-gray-700 bg-white hover:bg-slate-100 rounded-md mt-6"
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
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>

          <NavLink
            to="/manage/comment"
            className="aria-[current=page]:text-blue-400"
          >
            <span class="mx-4 font-medium">Bình luận</span>
          </NavLink>
        </a>
        </div>) : null}

      <div class="flex flex-col justify-between flex-1 mt-0">
        <nav>
          {JSON.parse(localStorage.getItem('role'))[0].roleId == 1 ? (<div>
            <a
              class="flex items-center px-4 py-3 w-[90%] text-gray-700 bg-white hover:bg-slate-100 rounded-md"
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
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                />
              </svg>

              <NavLink
                to="/manage/article"
                className="aria-[current=page]:text-blue-400"
              >
                <span class="mx-4 font-medium">Bài đăng</span>
              </NavLink>
            </a>

            <a
              class="flex items-center px-4 py-3 mt-3 text-gray-600 transition-colors duration-300 transform rounded-md w-[90%] bg-white hover:bg-slate-100"
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
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
              <NavLink
                to="/manage/comment"
                className="aria-[current=page]:text-blue-400"
              >
                <span class="mx-4 font-medium">Bình luận</span>
              </NavLink>
            </a>

            <a
              class="flex items-center px-4 w-[90%] py-3 mt-3 text-gray-600 transition-colors duration-300 transform rounded-md bg-white hover:bg-slate-100"
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
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <NavLink
                to="/manage/author"
                className="aria-[current=page]:text-blue-400"
              >
                <span class="mx-4 font-medium">Tác giả</span>
              </NavLink>
            </a>
            <a
              class="flex items-center w-[90%] px-4 py-3 mt-2 text-gray-600 transition-colors duration-300 transform rounded-md bg-white hover:bg-slate-100"
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
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
              <NavLink
                to="/manage/employee"
                className="aria-[current=page]:text-blue-400"
              >
                <span class="mx-4 font-medium">Nhân viên</span>
              </NavLink>
            </a>
            <a
              class="flex items-center w-[90%] px-4 py-3 mt-2 text-gray-600 transition-colors duration-300 transform rounded-md bg-white hover:bg-slate-100"
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
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 6h.008v.008H6V6z"
                />
              </svg>
              <NavLink
                to="/manage/category"
                className="aria-[current=page]:text-blue-400"
              >
                <span class="mx-4 font-medium">Chuyên mục</span>
              </NavLink>
            </a>
            <a
              class="flex items-center w-[90%] px-4 py-3 mt-2 text-gray-600 transition-colors duration-300 transform rounded-md bg-white hover:bg-slate-100"
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
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
              <NavLink
                to="/manage/reader"
                className="aria-[current=page]:text-blue-400"
              >
                <span class="mx-4 font-medium">Độc giả</span>
              </NavLink>
            </a>

          </div>) : (JSON.parse(localStorage.getItem('role'))[0].roleId == 2 ? (<div>
            <a
              class="flex items-center px-4 py-3 w-[90%] text-gray-700 bg-white hover:bg-slate-100 rounded-md"
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
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                />
              </svg>

              <NavLink
                to="/manage/article"
                className="aria-[current=page]:text-blue-400"
              >
                <span class="mx-4 font-medium">Bài đăng</span>
              </NavLink>
            </a>

            <a
              class="flex items-center px-4 py-3 mt-3 text-gray-600 transition-colors duration-300 transform rounded-md w-[90%] bg-white hover:bg-slate-100"
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
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
              <NavLink
                to="/manage/comment"
                className="aria-[current=page]:text-blue-400"
              >
                <span class="mx-4 font-medium">Bình luận</span>
              </NavLink>
            </a>

            <a
              class="flex items-center px-4 w-[90%] py-3 mt-3 text-gray-600 transition-colors duration-300 transform rounded-md bg-white hover:bg-slate-100"
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
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <NavLink
                to="/manage/author"
                className="aria-[current=page]:text-blue-400"
              >
                <span class="mx-4 font-medium">Tác giả</span>
              </NavLink>
            </a>
            <a
              class="flex items-center w-[90%] px-4 py-3 mt-2 text-gray-600 transition-colors duration-300 transform rounded-md bg-white hover:bg-slate-100"
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
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 6h.008v.008H6V6z"
                />
              </svg>
              <NavLink
                to="/manage/category"
                className="aria-[current=page]:text-blue-400"
              >
                <span class="mx-4 font-medium">Chuyên mục</span>
              </NavLink>
            </a>
            <a
              class="flex items-center w-[90%] px-4 py-3 mt-2 text-gray-600 transition-colors duration-300 transform rounded-md bg-white hover:bg-slate-100"
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
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
              <NavLink
                to="/manage/reader"
                className="aria-[current=page]:text-blue-400"
              >
                <span class="mx-4 font-medium">Độc giả</span>
              </NavLink>
            </a>
          </div>) : (<div>
            <a
              class="flex items-center px-4 py-3 w-[90%] text-gray-700 bg-white hover:bg-slate-100 rounded-md"
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
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                />
              </svg>

              <NavLink
                to="/manage/articleAU"
                className="aria-[current=page]:text-blue-400"
              >
                <span class="mx-4 font-medium">Bài đăng</span>
              </NavLink>
            </a>
          </div>))}




          <hr class="my-2 w-[90%] border-y-stone-300" />

          <a
            class="flex items-center w-[90%] px-4 py-3 mt-2 text-gray-600 transition-colors duration-300 transform rounded-md bg-white hover:bg-slate-100"
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
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <a
              // to="/"
              className="aria-[current=page]:text-blue-400 cursor-pointer"
              onClick={() => {
                // setUpdateValue((pre) => ({
                //   ...pre,
                //   ID: item.categoryId,
                // }));
                // setUpdateValue((pre) => ({ ...pre, NAME: item.name }));
                // setUpdateValue((pre) => ({ ...pre, EMAIL: item.name }));
                // setUpdateValue((pre) => ({ ...pre, ADDRESS: item.name }));
                // setUpdateValue((pre) => ({ ...pre, PHONE: item.name }));
                // setUpdateValue((pre) => ({ ...pre, GENDER: item.name }));
                // setUpdateValue((pre) => ({ ...pre, IMAGE: item.name }));
                setCheck(false)
                setShowModal(true);
              }}
            >
              <span class="mx-4 font-medium">Profile</span>
            </a>
          </a>
          <a
            class="flex items-center w-[90%] px-4 py-3 mt-2 text-gray-600 transition-colors duration-300 transform rounded-md bg-white hover:bg-slate-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>

            <a
              // to="/"
              className="aria-[current=page]:text-blue-400 cursor-pointer"
              onClick={() => {
                // setUpdateValue((pre) => ({
                //   ...pre,
                //   ID: item.categoryId,
                // }));
                // setUpdateValue((pre) => ({ ...pre, NAME: item.name }));
                // setUpdateValue((pre) => ({ ...pre, EMAIL: item.name }));
                // setUpdateValue((pre) => ({ ...pre, ADDRESS: item.name }));
                // setUpdateValue((pre) => ({ ...pre, PHONE: item.name }));
                // setUpdateValue((pre) => ({ ...pre, GENDER: item.name }));
                // setUpdateValue((pre) => ({ ...pre, IMAGE: item.name }));
                setCheck(true)
                setShowModal(true);
              }}
            >
              <span class="mx-4 font-medium">Đổi mật khẩu</span>
            </a>
          </a>

          <a
            class="flex items-center w-[90%] px-4 py-3 mt-2 text-gray-600 transition-colors duration-300 transform rounded-md bg-white hover:bg-slate-100 cursor-pointer"
            onClick={handleClickLogout}
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
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>

            <span class="mx-4 font-medium">Đăng xuất</span>
          </a>
        </nav>

        <div class="flex items-center px-4 -mx-2">
          <img
            class="object-cover mx-2 rounded-full h-9 w-9"
            src={JSON.parse(localStorage.getItem('user')).image}
            alt="avatar"
          />
          <span class="mx-2 font-medium text-gray-800 dark:text-gray-200">
            {JSON.parse(localStorage.getItem('user')).name}
          </span>
        </div>
      </div>
      {showModal && !check ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-80 max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg w-full">
                <div className="mt-3">
                  <h3 className="font-bold text-black text-xl">
                    Cập nhật thông tin
                  </h3>
                  <form
                    class="bg-white  px-8 pt-6 pb-8 mb-4 flex justify-between"
                  >
                    <div className="mr-10 w-full"><div class="mb-4">
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
                          Hình ảnh
                        </label>
                        <input
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                          name="IMAGE"
                          type="file"
                          onChange={handleChange}
                        />
                      </div></div>

                    <div className="w-full"><div class="mb-4">
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
                          value={updateValue.GENDER}
                          onChange={handleChange}
                        >
                          <option value="true">Nam</option>
                          <option value="false">Nữ</option>
                        </select>
                      </div></div>

                  </form>
                  <div className="flex">
                    <button className="w-full mt-2 p-2.5 mr-2  text-white bg-indigo-700 rounded-md outline-none ring-offset-2 hover:bg-indigo-800 focus:ring-2"
                      onClick={handleUpdate}>
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {showModal && check ? (
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
                    Đổi mật khẩu
                  </h3>
                  <form
                    class="bg-white  px-8 pt-6 pb-8 mb-4"
                  >
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="name"
                      >
                        Mật khẩu cũ
                      </label>
                      <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                        name="PASSWORD"
                        type="password"
                        placeholder="Nhập mật khẩu cũ"
                        value={updatePass.PASSWORD}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="name"
                      >
                        Mật khẩu mới
                      </label>
                      <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                        name="NEWPASSWORD"
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        value={updatePass.NEWPASSWORD}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="name"
                      >
                        Nhập lại mật khẩu mới
                      </label>
                      <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                        name="REPASSWORD"
                        type="password"
                        placeholder="Nhập lại mật khẩu mới"
                        value={updatePass.REPASSWORD}
                        onChange={handleChange}
                      />
                    </div>

                  </form>
                  <div className="flex">
                    <button className="w-full mt-2 p-2.5 mr-2  text-white bg-indigo-700 rounded-md outline-none ring-offset-2 hover:bg-indigo-800 focus:ring-2"
                      onClick={handlePassword}>
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </aside>
  );
};

export default Sidebar;
