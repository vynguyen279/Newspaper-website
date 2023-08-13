import React, { useState, useEffect } from "react";
import ManagementLayout from "../../../components/ManagementLayout";
import ReactQuill from "react-quill";
import "../../../styles/TextEditor.css";
import checkRole from "../../../utils/checkRole";
import { useLocation } from "react-router-dom";
import EditorToolbar, { modules, formats } from "../../../components/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import uploadImg from "../../../utils/uploadImage";
import { checkArticle, listCategory, updateArticle, findNameCategory } from "../../../server/Api";

const EditArticle = () => {
    checkRole()

    const { state } = useLocation();
    const [list, setList] = useState([]);
    const [cate, setCate] = useState("");
    useEffect(() => {
        if (list.length == 0) {
            let data = {
                KEY: "",
                STATUS: "true",
            };
            listCategory(data).then((rs) => {
                if (rs.data.status) {
                    setList(rs.data.data)
                }
            });
        }

        const cateId = {
            ID: state.data.categoryId
        }
        findNameCategory(cateId)
            .then((rs) => {
                if (rs.data.status) {
                    setCate(rs.data.data)
                } 
            })
            .catch(function (error) {
                alert(error);
            });

    }, []);
    const [value, setValue] = useState({
        articleId: state.data.articleId,
        content: state.data.content,
        title: state.data.title,
        categoryId: state.data.categoryId,
        status: state.data.status != "Bản nháp" ? "Chờ duyệt" : state.data.status,
        summary: state.data.summary
    })

    const handleImage = async (e) => {
        if (e.target.files[0]) {
            let img = await uploadImg(e.target.files[0])
            setValue((pre) => ({ ...pre, image: img }));
            // setUpdateValue((pre) => ({ ...pre, IMAGE: img }));
        }
    };
    const handleChangeContent = (value) => {
        setValue((pre) => ({ ...pre, content: value }));
      };

    const handleChange = (e) => {
        setValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
        // setValue((pre) => ({ ...pre, status: e.target.value }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(value)
        updateArticle(value)
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
                                Chỉnh sửa bài viết
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
                                            value={value.title}
                                        //   disabled
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
                                            value={value.summary}
                                        //   disabled
                                        onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    <div className="editor overflow-y-auto h-max">
                                        <EditorToolbar toolbarId={"t1"} />
                                        <ReactQuill
                                            //   theme="snow"
                                            //   value={}
                                            //   onChange={}
                                            value={value.content}

                                            onChange={handleChangeContent}
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
                                            disabled
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
                                Ảnh đại diện hiện tại
                            </label>
                            <img src={state.data.image} className="h-36 w-44 object-contain" alt="" />
                        </div>

                        <div class="mb-3">
                            <label
                                for="formFileSm"
                                class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                            >
                                Chọn ảnh đại diện mới (nếu cần)
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
                        <h3 className="mb-2">Chuyên mục hiện tại</h3>
                                <input className="w-full bg-blue-50 py-2 px-2 border-none"
                                    name="status"
                                    disabled
                                    value={cate}
                                />
                        </div>
                        <div className="my-2">
                            <h3 className="mb-2">Chuyên mục mới (nếu cần)</h3>
                            <select data-te-select-init className="w-full bg-blue-50 py-2 px-2 border-none"
                                name="categoryId"
                                onChange={handleChange}>
                                {list &&
                                    list.map((item, index) => (
                                        <option value={parseInt(item.categoryId)} key={index}>{item.name}</option>
                                    ))}
                            </select>
                        </div>

                        {
                            state.data.status === 'Bản nháp' ? (<div>
                                <h3 className="mb-2">Trạng thái</h3>
                                <select data-te-select-init className="w-full bg-blue-50 py-2 px-2 border-none"
                                    name="status"
                                    onChange={handleChange}
                                >

                                    <option value="Bản nháp">Bản nháp</option>
                                    <option value="Chờ duyệt">Bản chính thức</option>
                                </select>
                            </div>) : (<div>
                                <h3 className="mb-2">Trạng thái</h3>
                                <input className="w-full bg-blue-50 py-2 px-2 border-none"
                                    name="status"
                                    disabled
                                    value={state.data.status}
                                />
                            </div>)
                        }
                        {state.data.status === 'Đã ẩn' ? null : <div className="mt-8">
                            <button
                                className="middle none mt-5 w-full center rounded-lg bg-primary py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-sm shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                data-ripple-light="true"

                                onClick={handleUpdate}
                            >
                                Cập nhật
                            </button>
                        </div>}
                    </div>
                </div>
            </ManagementLayout>
        </div>
    )
}

export default EditArticle
