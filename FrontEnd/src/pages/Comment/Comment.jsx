import React, { useEffect, useState } from 'react'
import Card from './Card'
import { listCommentByArticle, addComment } from '../../server/Api'
import { useLocation } from 'react-router-dom'

const Comment = () => {
    const [list, setList] = useState([])
    const { state } = useLocation();
    const [comment, setComment] = useState({
        readerId: JSON.parse(localStorage.getItem('user')).userId,
        articleId: state.data.articleId,
        content: "",
        replyTo: null
    })
    
    useEffect(() => {
        let data = {
            ID: state.data.articleId
        };
        listCommentByArticle(data).then((rs) => {
            if (rs.data.status) {
                setList(rs.data.data)
                console.log(rs.data.data)
            }
        });
    }, [state.data.articleId]);


    const handleChange = (e) => {
        setComment((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    };

    const handleAdd = () => {
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

        <div>
            <h3 className='font-semibold text-2xl'>Bình luận</h3>
            <div>
                <textarea className="shadow appearance-none border mt-5 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:border-primary focus:shadow-outline border-collapse border-slate-300" type="text" placeholder='Bạn đang nghĩ gì?' name='content' onChange={handleChange} value={comment.content}/>
                <button className='bg-indigo-700 text-white p-2 w-20 rounded-md hover:bg-indigo-800' onClick={handleAdd} >Gửi</button>
            </div>
            <div>
                {list &&
                    list.map((item, index) => (
                        <Card data={item} key={index} />
                    ))}
            </div>
        </div>
    )
}

export default Comment
