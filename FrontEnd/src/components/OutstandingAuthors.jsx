import React from 'react'

const OutstandingAuthors = () => {
  return (
    <div className="px-4 py-2">
    <h3 className="text-primary font-bold text-xl text-left mb-3">
      Tác giả nổi bật
    </h3>
    <a href="" className="hover:text-blue-900">
      {" "}
      <div className="grid grid-cols-3 gap-1 mb-3">
        <div className="img col-span-1">
          <img
          className='rounded-full object-cover h-20 w-20'
            src="https://th.bing.com/th/id/OIP.R5LmYQedE4niTye5FGe8UAHaM8?pid=ImgDet&rs=1"
            alt=""
          />
        </div>
        <div className="col-span-2 flex flex-col justify-center items-start">
          <h4 className="font-bold ">Eden Laws</h4>
          <h4 className="font-extralight ">500 bài viết</h4>
        </div>
      </div>
    </a>
    
  </div>
  )
}

export default OutstandingAuthors
