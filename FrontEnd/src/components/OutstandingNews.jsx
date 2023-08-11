import React from "react";

const OutstandingNews = () => {
  return (
    <div className="px-4 py-2">
      <h3 className="text-primary font-bold text-xl text-left mb-3">
        Tin nổi bật
      </h3>
      <a href="" className="hover:text-blue-900">
        {" "}
        <div className="list grid grid-cols-4 gap-3 mb-3">
          <div className="img col-span-2">
            <img
              src="https://i1-dulich.vnecdn.net/2023/07/06/thonhiky-2740-1688640842.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=JUiuI8_Naxm3-IBtwxJ7hA"
              alt=""
            />
          </div>
          <div className="content col-span-2">
            <h4 className="font-bold ">Khám phá thiên đường du lịch Á Âu</h4>
          </div>
        </div>
      </a>
      
    </div>
  );
};

export default OutstandingNews;
