import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { callData } from '../../context/calldata';

export default function Navbar() {
  // change task open status
  let { setTaskPageIsActive } = useContext(callData);
  // chick notification alert is open or not
  let [isOpen, setIsOpen] = useState(false);
  // check if user tap in notification or not
  let [istap, setIsTap] = useState(false);
  // save istap state in localstorage
  const saveStatus = () => {
    localStorage.setItem('status', JSON.stringify(istap));
  };
  return (
    <>
      <nav className="w-full fixed z-30 top-0 bg-[#F8F8F8] py-1 md:px-10 px-5 shadow-inner shadow-blackColor flex justify-between items-center">
        <div className="logo">
          <Link
            className="text-primaryColor font-semibold md:text-[32px] text-[20px]"
            to={'/'}
          >
            To Do
            <span className="text-blackColor"> App</span>
          </Link>
        </div>
        <div className="links flex items-center gap-5">
          <div className="notification relative">
            <i
              onClick={() => setIsOpen(!isOpen)}
              className="fa-solid fa-bell text-[25px] text-textColor cursor-pointer"
            ></i>
            <div
              className={`${
                isOpen ? 'block' : 'hidden'
              } showNotification absolute shadow-sm z-[500] w-[300px] min-h-[200px] max-h-[220px] overflow-y-scroll  bg-[#F1E7E7] rounded-lg right-0 top-11`}
            >
              <div className="notification_details ">
                <ul className="flex flex-col ">
                  <li
                    onClick={() => {
                      setIsTap(true), saveStatus();
                    }}
                    className={`${
                      istap ? 'bg-transparent' : 'bg-[#FFD0C7]'
                    } notdetails px-2 py-5 border-b border-textColor text-[15px]`}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cupiditate quas vel
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
