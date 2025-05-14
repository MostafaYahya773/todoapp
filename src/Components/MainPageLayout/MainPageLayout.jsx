import React, { useContext, useEffect, useState } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import { Link, NavLink } from 'react-router-dom';
import Last from '../Last/Last';
import { callData } from '../../context/calldata';

export default function MainPageLayout() {
  const [isActive, setIsActive] = useState('status');
  const [LinkOneActive, setLinkOneActive] = useState(true);
  const [LinkTwoActive, setLinkTwoActive] = useState(false);
  // change task open status
  let { setTaskPageIsActive } = useContext(callData);
  return (
    <div className="grid grid-rows-[auto_1fr] z-10 mx-5 md:mx-10 mt-[65px] gap-y-3 ">
      <div className="flex justify-between flex-wrap gap-y-3">
        <ul className="links bg-[#ededed] rounded-2xl cursor-pointer  flex justify-around">
          <li
            onClick={() => {
              setIsActive('status'),
                setLinkOneActive(true),
                setLinkTwoActive(false);
            }}
            className={`${
              LinkOneActive && 'bg-primaryColor text-whiteColor'
            } px-10 py-2 w-full text-center rounded-s-2xl`}
          >
            <NavLink>Status</NavLink>
          </li>
          <li
            onClick={() => {
              setIsActive('latest'),
                setLinkTwoActive(true),
                setLinkOneActive(false);
            }}
            className={`${
              LinkTwoActive && 'bg-primaryColor text-whiteColor'
            } px-10 py-2 w-full  text-center rounded-e-2xl`}
          >
            <NavLink>Latest</NavLink>
          </li>
        </ul>
        <div className="all_btns flex gap-x-3">
          <button
            onClick={() => setTaskPageIsActive(true)}
            className="bg-[#ededed] text-textColor py-2 text-[18px] flex justify-center items-center px-5 rounded-lg hover:text-whiteColor hover:bg-primaryColor hover:transition-all hover:duration-500"
          >
            <p className="block">Add Task</p>
          </button>

          <Link to={'/allTasksLayout'}>
            <div className="bg-primaryColor text-whiteColor py-2 text-[18px] flex justify-center items-center px-5 rounded-lg">
              <p className="block">All Tasks</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="body">
        {isActive === 'status' && <Dashboard />}
        {isActive === 'latest' && <Last />}
      </div>
    </div>
  );
}
