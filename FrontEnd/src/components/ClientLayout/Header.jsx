
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import uploadImg from "../../utils/uploadImage";
import { useNavigate } from "react-router-dom";
import { listCategory, registerAuthor, registerReader, changePassword, signIn, updateUser, sendEmail, resetPassword, listRole } from "../../server/Api";

const Header = () => {
  const [list2, setListRole] = useState([]);
  const [list, setList] = useState([]);
  const [role, setRole] = useState("1");
  const history = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  // True: Author
  // False: Reader
  // 1: register
  // 2: change password
  // 3: login
  // 3: update profile

  useEffect(() => {
    listRole().then((rs) => {
      if (rs.data.status) {
        setListRole(rs.data.data)
      }
    });
  }, []);
  const [type, setType] = useState(null);
  const [registerValue, setRegisterValue] = useState({
    NAME: "",
    EMAIL: "",
    ADDRESS: "",
    GENDER: 1,
    IMAGE: "",
    PHONE: "",
    PASSWORD: "",
  });
  const [updateValue, setUpdateValue] = useState({
    NAME: "",
    ID: JSON.parse(localStorage.getItem('user')).userId ? JSON.parse(localStorage.getItem('user')).userId : null,
    EMAIL: "",
    ADDRESS: "",
    GENDER: 1,
    IMAGE: "",
    PHONE: "",
  });
  const [updatePass, setUpdatePass] = useState({
    EMAIL: JSON.parse(localStorage.getItem('user')).email ? JSON.parse(localStorage.getItem('user')).email : null,
    PASSWORD: "",
    NEWPASSWORD: "",
    REPASSWORD: ""
  });
  const [loginValue, setLoginValue] = useState({
    username: "",
    password: ""
  });
  const [author, setAuthor] = useState({
    AUTHOR: 1,
  });

  const handleChange = (e) => {
    setRegisterValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    setUpdatePass((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    setLoginValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    setUpdateValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleImg = async (e) => {
    if (e.target.files[0]) {
      let img = await uploadImg(e.target.files[0])
      setRegisterValue((pre) => ({ ...pre, IMAGE: img }));
      setUpdateValue((pre) => ({ ...pre, IMAGE: img }));
    }
  };

  const handleClickRegister = () => {
    setType(1)
    setShowModal(true)
  }
  const handleClickPassword = () => {
    setType(2)
    setShowModal(true)
  }
  const handleClickLogin = () => {
    setType(3)
    setShowModal(true)
  }
  const handleClickUpdate = () => {
    setType(4)
    setShowModal(true)
  }
  const handleClickLogout = () => {
    localStorage.clear()
    setLoginValue((pre) => ({ ...pre, username: '' }));
    setLoginValue((pre) => ({ ...pre, password: '' }));
    localStorage.setItem('user', JSON.stringify({}))
    history("/", { replace: true })
  }

  const handlePassword = (e) => {
    e.preventDefault();
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
  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser(updateValue)
      .then((rs) => {
        if (rs.data.status) {
          alert(rs.data.message);
          setShowModal(false)
        } else alert(rs.data.message);
      })
      .catch(function (error) {
        alert(error);
      });
  }

  const handleReset = (e) => {
    e.preventDefault();

    resetPassword({ EMAIL: email })
      .then(function (response) {
        if (response.data.status) {
          sendEmail({ EMAIL: email, mess: response.data.data })
            .then(function (response) {
              if (response.data.status) {
                alert(response.data.message);
              } else alert(response.data.message);
            })
            .catch(function (error) {
              console.log(error);
            });
        } else alert(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  const handleRegister = (e) => {
    e.preventDefault()
    if (author.AUTHOR == '1') {
      registerAuthor(registerValue)
        .then((rs) => {
          if (rs.data.status) {
            alert(rs.data.message);
            setShowModal(false);
          } else alert(rs.data.message);
        })
        .catch(function (error) {
          alert(error);
        });
      // console.log("Author")
    } else {
      registerReader(registerValue)
        .then((rs) => {
          if (rs.data.status) {
            alert(rs.data.message);
            setShowModal(false);
          } else alert(rs.data.message);
        })
        .catch(function (error) {
          alert(error);
        });
      // console.log("Reader")
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()

    signIn(loginValue)
      .then((rs) => {
        if (rs.data.status) {
          setUpdatePass((pre) => ({ ...pre, EMAIL: JSON.parse(localStorage.getItem('user')).email }))
          setUpdateValue((pre) => ({ ...pre, ID: JSON.parse(localStorage.getItem('user')).userId }))
          setUpdateValue((pre) => ({ ...pre, EMAIL: JSON.parse(localStorage.getItem('user')).email }))
          setUpdateValue((pre) => ({ ...pre, GENDER: JSON.parse(localStorage.getItem('user')).gender }))
          setUpdateValue((pre) => ({ ...pre, NAME: JSON.parse(localStorage.getItem('user')).name }))
          setUpdateValue((pre) => ({ ...pre, ADDRESS: JSON.parse(localStorage.getItem('user')).address }))
          setUpdateValue((pre) => ({ ...pre, PHONE: JSON.parse(localStorage.getItem('user')).phone }))
          setUpdateValue((pre) => ({ ...pre, IMAGE: JSON.parse(localStorage.getItem('user')).image }))
          for (let index = 0; index < rs.data.data[0].role.length; index++) {
            if (rs.data.data[0].role[index].roleId == role) {
              localStorage.setItem('Auth', true)
              localStorage.setItem('Authorization', rs.headers.authorization)
              console.log( rs.headers.authorization)
              localStorage.setItem('user', JSON.stringify(rs.data.data[0]))
              localStorage.setItem('role', JSON.stringify([{ roleId: rs.data.data[0].role[index].roleId, name: rs.data.data[0].role[index].name }]))
              alert(rs.data.message);
              setShowModal(false);
              if (JSON.parse(localStorage.getItem('role'))[0].roleId === 1)
                history("/manage/article", { replace: true });
              if (JSON.parse(localStorage.getItem('role'))[0].roleId === 2)
                history("/manage/article", { replace: true });
              if (JSON.parse(localStorage.getItem('role'))[0].roleId === 3)
                history("/manage/articleAU", { replace: true });
            }
            else {
              continue
            }
          }

          if(!localStorage.Auth){
            alert("Bạn không có quyền truy cập với chức vụ này!")
            return
          }


        } else alert(rs.data.message);
      })
      .catch(function (error) {
        alert(error);
      });
  }

  useEffect(() => {
    let data = {
      KEY: '',
      STATUS: "true",
    };
    listCategory(data).then((rs) => {
      if (rs.data.status) {
        // console.log(rs.data.data)
        setList(rs.data.data)
      }
    });

  }, []);
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 text-center mb-16 pt-5 justify-items-end">
        <div className="col-span-2">        <Link to="/">
          {" "}
          <h1 className="text-3xl font-bold text-secondary">
            .Daily<span className="text-3xl font-bold text-primary">News</span>
            <h3 className="text-lg">Khám phá những điều mới mẻ. Bạn đã biết?</h3>
          </h1>
        </Link></div>
        {
          localStorage.Auth ? (<div className="col-span-1 row-span-1 mr-3">
            <button onClick={handleClickPassword} className="w-32 bg-primary px-3 py-2 mr-5 rounded-lg">Đổi mật khẩu</button>
            <button className="w-28 bg-secondary px-3 py-2 text-white rounded-lg" onClick={handleClickUpdate}>Profile</button>
            <button className="w-28 ml-3 bg-secondary px-3 py-2 text-white rounded-lg" onClick={handleClickLogout}>Đăng xuất</button>
          </div>) : (<div className="col-span-1 row-span-1 mr-3">
            <button onClick={handleClickRegister} className="w-28 bg-primary px-3 py-2 mr-5 rounded-lg">Đăng ký</button>
            <button className="w-28 bg-secondary px-3 py-2 text-white rounded-lg" onClick={handleClickLogin}>Đăng nhập</button>
          </div>)
        }
      </div>
      <NavBar data={list} />

      {showModal && type == 1 ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-300 max-w-xl p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3">
                  <h3 className="font-bold text-black text-xl">
                    Đăng ký tài khoản
                  </h3>
                  <form
                    class="bg-white  px-8 pt-6 pb-8 mb-4 flex"
                  >
                    <div className="flex-1 mr-5"><div class="mb-4">
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
                        value={registerValue.NAME}
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
                          value={registerValue.EMAIL}
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
                          value={registerValue.PHONE}
                          onChange={handleChange}
                        />
                      </div>
                      <div class="mb-4">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="IMAGE"
                        >
                          Ảnh đại diện
                        </label>
                        <input
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                          name="IMAGE"
                          type="file"
                          // value={registerValue.IMAGE}
                          onChange={handleImg}
                        />
                      </div></div>
                    <div className="flex-1"><div class="mb-4">
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
                        value={registerValue.ADDRESS}
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
                      <div class="mb-4">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="name"
                        >
                          Mật khẩu
                        </label>
                        <input
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                          name="PASSWORD"
                          type="password"
                          placeholder="Số điện thoại"
                          value={registerValue.PASSWORD}
                          onChange={handleChange}
                        />
                      </div>
                      <div class="mb-4">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          for="GENDER"
                        >
                          Bạn muốn đăng ký tài khoản dành cho?
                        </label>
                        <select
                          data-te-select-init
                          name="AUTHOR"
                          className="w-full py-2 h-10 px-2 border rounded border-gray-300 outline-none"
                          onChange={(e) => setAuthor((pre) => ({ ...pre, AUTHOR: e.target.value }))}
                        >
                          <option value="1">Nhà báo</option>
                          <option value="0">Độc giả</option>
                        </select>
                      </div></div>

                  </form>
                  <div className="flex">
                    <button className="w-full mt-2 p-2.5 mr-2  text-white bg-indigo-700 rounded-md outline-none ring-offset-2 hover:bg-indigo-800 focus:ring-2" onClick={handleRegister}>
                      Tạo tài khoản
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {showModal && type == 2 ? (
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
      {showModal && type == 3 ? (
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
                    Đăng nhập
                  </h3>
                  <form
                    class="bg-white  px-8 pt-6 pb-8 mb-4"
                  >
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="name"
                      >
                        Email
                      </label>
                      <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                        name="username"
                        type="text"
                        placeholder="Nhập email"
                        value={loginValue.username}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="name"
                      >
                        Mật khẩu
                      </label>
                      <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                        name="password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={loginValue.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="mb-4">
                      <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="name"
                      >
                        Bạn là?
                      </label>
                      <select
                        data-te-select-init
                        name="ROLE"
                        className="w-full py-2 h-10 px-2 border rounded border-gray-300 outline-none"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        {list2 && list2.map((item, index) => (
                          <option key={index} value={item.ROLEID}>{item.NAME}</option>
                        ))}
                      </select>
                    </div>

                    <div class="mb-4">
                      <a href="" className="text-primary cursor-pointer font-semibold hover:text-orange-700"
                        onClick={() => {
                          // setShowModal(false)
                          setType(5);
                          // setShowModal(true) 
                        }}
                      >Quên mật khẩu?</a>
                    </div>
                  </form>
                  <div className="flex">
                    <button className="w-full mt-2 p-2.5 mr-2  text-white bg-indigo-700 rounded-md outline-none ring-offset-2 hover:bg-indigo-800 focus:ring-2"
                      onClick={handleLogin}>
                      Đăng nhập
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {showModal && type == 5 ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3">
                  <h3 className="font-bold text-black text-xl mb-10">
                    Đặt lại mật khẩu
                  </h3>
                  <form
                    class="bg-white  px-8 pt-6 mb-4"
                    className="flex justify-center"
                  >
                    <div className="">
                      <label
                        class="block text-gray-700 text-lg font-bold mb-2"
                        for="name"
                      >
                        Email đã đăng ký tài khoản
                      </label>
                      <input
                        class="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                        // name="password"
                        type="text"
                        placeholder="Nhập email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <button className="w-36 mt-8 ml-3 p-2.5 justify-items-center text-white bg-indigo-700 rounded-md outline-none ring-offset-2 hover:bg-indigo-800 focus:ring-2"
                      onClick={handleReset}>
                      Gửi
                    </button>
                    {/* </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {showModal && type == 4 ? (
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
                    Cập nhật thông tin cá nhân
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
                          Họ tên
                        </label>
                        <input
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300"
                          name="NAME"
                          type="text"
                          value={updateValue.NAME}
                          placeholder="Họ tên"
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
                          onChange={handleImg}
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

export default Header;
