import React, { useState, useEffect } from "react";
import ManagementLayout from "../../../components/ManagementLayout";
import ReactQuill from "react-quill";
import "../../../styles/TextEditor.css";
import checkRole from "../../../utils/checkRole";
import { useLocation } from "react-router-dom";
import EditorToolbar, { modules, formats } from "../../../components/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { checkArticle } from "../../../server/Api";

const CheckArticle = () => {
  checkRole()
  const { state } = useLocation();
  const [value, setValue] = useState({
    articleId: state.data.articleId,
    note: state.data.note,
    status: state.data.status==="Đã duyệt"?"Đã ẩn":"Đã duyệt",
    checkedEmployee: JSON.parse(localStorage.getItem('user')).userId
  })

  const handleChange = (e) => {
    setValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    // setValue((pre) => ({ ...pre, status: e.target.value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    checkArticle(value)
      .then((rs) => {
        if (rs.data.status) {
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
                Duyệt bài viết
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
                      value={state.data.title}
                      disabled
                    // onChange={handleChange}
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
                      value={state.data.summary}
                      disabled
                    // onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="editor overflow-y-auto h-max">
                    <EditorToolbar toolbarId={"t1"} />
                    <ReactQuill
                      //   theme="snow"
                      //   value={}
                      //   onChange={}
                      value={state.data.content}
                      readOnly={true}
                      // onChange={handleChangeContent}
                      placeholder={"Write something awesome..."}
                      modules={modules("t1")}

                      formats={formats}
                    />
                  </div>
                  <div class="my-2">
                    <label for="sumary">Ghi chú</label>
                    <textarea
                      type="text"
                      name="note"
                      id="note"
                      class="h-56 p-2 border mt-1 rounded px-2 w-full"
                      placeholder="Nhập ghi chú"
                    value={value.note}
                    onChange={handleChange}
                    ></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="bg-white mt-20 col-span-1 p-3 h-max shadow-lg overflow-hidden">
            <div class="mb-3">
              <label
                for="formFileSm"
                class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
              >
                Ảnh đại diện
              </label>
              <img src={state.data.image} className="h-36 w-44 object-contain" alt="" />
            </div>
            <div>
            </div>
            {
              state.data.status === 'Đã duyệt' ? (<div>
                <h3 className="mb-2">Trạng thái</h3>
                <select data-te-select-init className="w-full bg-blue-50 py-2 px-2 border-none"
                name="status"
                onChange={handleChange}
                >

                  <option value="Đã ẩn">Ẩn bài viết</option>
                </select>
              </div>) : (<div>
                <h3 className="mb-2">Trạng thái</h3>
                <select data-te-select-init className="w-full bg-blue-50 py-2 px-2 border-none"
                name="status"
                defaultValue="Đã duyệt"
                onChange={handleChange}
                >

                  <option value="Đã duyệt">Duyệt</option>
                  <option value="Chưa đạt">Chưa đạt</option>
                </select>
              </div>)
            }

            <div className="mt-8">
              <button
                className="middle none mt-5 w-full center rounded-lg bg-primary py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-sm shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"

              onClick={handleUpdate}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </ManagementLayout>
    </div>
  )
}

export default CheckArticle
