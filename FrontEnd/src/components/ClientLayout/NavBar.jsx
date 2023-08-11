import React from 'react'
import { Link } from "react-router-dom";
import Category from '../../pages/Category'


const NavBar = ({ data }) => (
  <div>
    <nav>
      <ul className='list-none sm:flex hidden bg-secondary justify-center'>
        {data && data.map((nav, index) => (
          <Link   to={`/category`}
          state={{ data: nav }}
          key={index} >
          <li
            key={index}
            className='m-3 group cursor-pointer'
          >
            <a className='text-[#fff] hover:text-blue-700'>{nav.name}</a>
          </li>
          </Link>
        ))}
      </ul>
    </nav>
  </div>
)

export default NavBar
