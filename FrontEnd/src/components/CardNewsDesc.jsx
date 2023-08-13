import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";
import { findNameCategory } from "../server/Api";

const CardNewsDesc = ({ type, data }) => {
  const [cate, setCate] = useState('')
  useEffect(() => {

      findNameCategory({ID: data.categoryId}).then((rs) => {
      // console.log(rs.data.data)
      if (rs.data.status) {
        setCate(rs.data.data);
        // console.log(rs.data.data)
      }
    });
  }, []);

  return (
    <div>
      {
        type == "5" ? (<Link to={`/detail`}
          state={{ data: data }} onClick={() => { window.scrollTo(0, 0); if (location.href.includes('detail')) window.location.reload() }}><a href="">
            <div className='flex flex-row'>
              <div className="mr-2">
                <img className="h-40 w-full" src={data.image} alt="" />
              </div>
              <h3 className='text-base font-bold hover:text-blue-900'>{data.title}</h3>
            </div>
          </a></Link>) : (type == "4") ? (<Link to={`/detail`}
            state={{ data: data }} onClick={() => { window.scrollTo(0, 0); if (location.href.includes('detail')) window.location.reload() }}><a href="">
              <div className='flex flex-col'>
                <div className="h-25">
                  <img className="h-40 min-w-full object-cover" src={data.image} alt="" />
                </div>
                <h3 className='text-base font-bold hover:text-blue-900'>{data.title}</h3>
              </div>
            </a></Link>) : (type == "2") ? (<Link to={`/detail`}
              state={{ data: data }} onClick={() => { window.scrollTo(0, 0); if (location.href.includes('detail')) window.location.reload() }}><a href="">
                <div className='flex flex-col'>
                  <div className="">
                    <img className="object-cover" src={data.image} alt="" />
                  </div>
                  <h3 className='text-base font-bold hover:text-blue-900'>{data.title}</h3>
                  <p>{data.summary}</p>
                </div>
              </a></Link>) : (type == '6') ? (<Link to={`/detail`}
                state={{ data: data }} onClick={() => { window.scrollTo(0, 0); if (location.href.includes('detail')) window.location.reload() }}><a href="" className="">
                  <div className="flex flex-row">
                    <div className="mr-2 w-52">
                      <img
                        className="object-cover h-32 w-52"
                        src={data.image}
                        alt=""
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold hover:text-blue-900">
                        {data.title}
                      </h3>
                      <p className="font-semibold my-2">
                        {cate} - <span className="text-primary font-semibold">{formatDate(data.checkedTime)}</span>
                      </p>
                      <p>
                        {data.summary}
                      </p>
                    </div>
                  </div>
                </a></Link>) : (<Link to={`/detail`}
                  state={{ data: data }} onClick={() => {  window.scrollTo(0, 0);if (location.href.includes('detail')) window.location.reload() }}><a href="">
                    <div className='flex flex-col'>
                      <div className="">
                        <img className="" src={data.image} alt="" />
                      </div>
                      <h3 className='text-2xl font-bold hover:text-blue-900'>{data.title}</h3>
                      <p>{data.summary}</p>
                    </div>
                  </a></Link>)
      }
    </div>
  );
};

export default CardNewsDesc;
