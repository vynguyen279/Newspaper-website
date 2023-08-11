import React, { useEffect, useState } from 'react'
import { addComment } from '../../server/Api';
import { useLocation } from 'react-router-dom'

const Card = ({ data }) => {
    const [type, setType] = useState(null)
    const { state } = useLocation();
    const [comment, setComment] = useState({
        readerId: JSON.parse(localStorage.getItem('user')).userId,
        articleId: state.data.articleId,
        content: "",
        replyTo: data.commentId
    })
    

    const handleChange = (e) => {
        setComment((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    };

    const handleAdd = (e) => {
        e.preventDefault();
        // console.log(comment)
        if (localStorage.Auth) {
            addComment(comment)
                .then((rs) => {
                    if (rs.data.status) {
                        setComment((pre) => ({ ...pre, content: "" }));
                        alert(rs.data.message);
                    } else alert(rs.data.message);
                })
                .catch(function (error) {
                    alert(error);
                });
        }
        else {
            alert("Bạn phải đăng nhập hoặc đăng ký (nếu chưa có tài khoản) để bình luận!")
            return
        }

    };
    return (
        <div className='flex mt-5 mb-3 w-full justify-start'>
            <div className=''><img className='object-fill w-16 h-16 rounded-full' src="https://static-images.vnncdn.net/files/publish/2023/8/4/vn-uc-2-893.jpg" alt="" /></div>
            <div className='flex flex-col ml-3 flex-1'>
                <p className='font-semibold'>Elex Main</p>
                <p>{data.content}</p>
                <button className="p-1 mt-2 rounded-3xl bg-slate-200 hover:bg-slate-300 w-20" onClick={()=>setType(1)}>Phản hồi</button>
                {type == 1 ? (<div className='flex flex-col'>
                    <textarea className="shadow appearance-none border mt-5 rounded  w-full py-3 px-4 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300" type="text" placeholder='Bạn đang nghĩ gì?' name="content" value={comment.content} onChange={handleChange}/>
                    <div className='flex mt-2'>
                        <button className='bg-white text-black p-1 w-20 rounded-lg hover:bg-slate-300 ' onClick={handleAdd}>Gửi</button>
                        <button className='bg-white text-black p-1 w-20 rounded-lg hover:bg-slate-300' onClick={()=>setType(0)}>Hủy</button>
                    </div>
                </div>) : null}
            </div>

        </div>
    )
}

export default Card
