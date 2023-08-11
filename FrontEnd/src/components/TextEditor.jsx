import React from "react";
import ReactQuill from "react-quill";
import "../styles/TextEditor.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";

const TextEditor = () => {
  return (
    <div>
      <h3 className="font-semibold text-xl text-left px-5 mb-3">
        Tạo bài viết
      </h3>
      <div className="bg-white p-5">
        <form className="w-full" action="">
          <div class="">
            <label for="title">Tiêu đề</label>
            <input
              type="text"
              name="title"
              id="title"
              class="h-10 border mt-1 rounded px-4 w-full"
              placeholder="Nhập tiêu đề"
            />
          </div>

          <div class="my-2">
            <label for="sumary">Tóm tắt</label>
            <textarea
              type="text"
              name="sumary"
              id="sumary"
              class="h-15 p-2 border mt-1 rounded px-4 w-full"
              placeholder="Nhập tóm tắt"
            ></textarea>
          </div>
          <div className="editor overflow-y-auto h-screen">
            <EditorToolbar toolbarId={"t1"} />
            <ReactQuill
              //   theme="snow"
              //   value={}
              //   onChange={}
              placeholder={"Write something awesome..."}
              modules={modules("t1")}
              formats={formats}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TextEditor;
