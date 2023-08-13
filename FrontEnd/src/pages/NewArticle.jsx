import React, { useState, useEffect } from "react";
import ManagementLayout from "../components/ManagementLayout";
import TextEditor from "../components/TextEditor";
import checkRole from "../utils/checkRole";
import ReactQuill from "react-quill";
import uploadImg from "../utils/uploadImage";
import "../styles/TextEditor.css";
import EditorToolbar, { modules, formats } from "../components/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { listCategory, addArticle } from "../server/Api";

const NewArticle = () => {
  checkRole()
  const [list, setList] = useState([]);
  useEffect(() => {
    if (list.length == 0) {
      let data = {
        KEY: "",
        STATUS: "true",
      };
      listCategory(data).then((rs) => {
        if (rs.data.status) {
          setList(rs.data.data)
          setNewValue((pre) => ({ ...pre, categoryId: rs.data.data[0].categoryId }));
        }
      });
    }

  }, []);
  const [newValue, setNewValue] = useState({
    title: "",
    content: "",
    summary: "",
    authorId: JSON.parse(localStorage.getItem('user')).userId,
    categoryId: "",
    status: "Chờ duyệt",
    image: "",
  });

  const handleChange = (e) => {
    setNewValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    // setNewValue((pre) => ({ ...pre, categoryId: parseInt(e.target.value) }));
  };

  const handleChangeContent = (value) => {
    setNewValue((pre) => ({ ...pre, content: value }));
  };

  const handleImage = async (e) => {
    if (e.target.files[0]) {
      let img = await uploadImg(e.target.files[0])
      setNewValue((pre) => ({ ...pre, image: img }));
      // setUpdateValue((pre) => ({ ...pre, IMAGE: img }));
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    // console.log(newValue)
    addArticle(newValue)
      .then((rs) => {
        if (rs.data.status) {
          setNewValue((pre) => ({ ...pre, title: "" }));
          setNewValue((pre) => ({ ...pre, summary: "" }));
          setNewValue((pre) => ({ ...pre, content: "" }));
          setNewValue((pre) => ({ ...pre, image: "" }));
          alert(rs.data.message);
        } else alert(rs.data.message);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <div>
      <ManagementLayout>
        <div className="w-full h-screen p-5  grid grid-cols-5 gap-3">
          <div className="col-span-4">
            {/* <TextEditor /> */}
            <div>
              <h3 className="font-semibold text-xl text-left px-5 mb-3">
                Tạo bài viết
              </h3>
              <div className="bg-white p-5">
                <form className="w-full" action="">
                  <div class="">
                    <label for="title">Tiêu đề</label>
                    <textarea
                      type="text"
                      name="title"
                      id="title"
                      class="h-20 border mt-1 rounded p-2 w-full"
                      placeholder="Nhập tiêu đề"
                      value={newValue.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div class="my-2">
                    <label for="sumary">Tóm tắt</label>
                    <textarea
                      type="text"
                      name="summary"
                      id="summary"
                      class="h-24 p-2 border mt-1 rounded px-2 w-full"
                      placeholder="Nhập tóm tắt"
                      value={newValue.summary}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="editor overflow-y-auto h-screen">
                    <EditorToolbar toolbarId={"t1"} />
                    <ReactQuill
                      //   theme="snow"
                      //   value={}
                      //   onChange={}
                      value={newValue.content}
                      onChange={handleChangeContent}
                      placeholder={"Write something awesome..."}
                      modules={modules("t1")}
                      formats={formats}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="bg-white mt-20 col-span-1 p-3 h-80 shadow-lg overflow-hidden">
            <div class="mb-3">
              <label
                for="formFileSm"
                class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
              >
                Chọn ảnh đại diện
              </label>
              <input
                class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 "
                id="formFileSm"
                type="file"
                name="image"
                onChange={handleImage}
              />
            </div>
            <div>
              <h3 className="mb-2">Chuyên mục</h3>
              <select data-te-select-init className="w-full bg-blue-50 py-2 px-2 border-none"
                name="categoryId"
                onChange={handleChange}>
                {list &&
                  list.map((item, index) => (
                    <option value={parseInt(item.categoryId)} key={index}>{item.name}</option>
                  ))}
              </select>
            </div>
            <div>
              <h3 className="mb-2">Trạng thái</h3>
              <select data-te-select-init className="w-full bg-blue-50 py-2 px-2 border-none"
                name="status"
                onChange={handleChange}>

                <option value="Chờ duyệt">Bản chính thức</option>
                <option value="Bản nháp">Bản nháp</option>
              </select>
            </div>
            <div className="mt-5">
              {/* <button
                className="middle w-full none center rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-sm shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
              >
                Lưu bản nháp
              </button> */}
              <button
                className="middle none mt-5 w-full center rounded-lg bg-primary py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-sm shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"

                onClick={handleAdd}
              >
                Thêm bài viết
              </button>
            </div>
          </div>
        </div>
      </ManagementLayout>
    </div>
  );
};

export default NewArticle;
