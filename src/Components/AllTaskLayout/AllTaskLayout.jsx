import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import AllTasks from '../TaskesLayoutToShow/AllTasks/AllTasks';
import ToDoTask from '../TaskesLayoutToShow/ToDoTask/ToDoTask';
import InPrograssTask from '../TaskesLayoutToShow/InPrograssTask/InPrograssTask';
import CompletedTask from '../TaskesLayoutToShow/CompletedTask/CompletedTask';

export default function AllTaskLayout() {
  return (
    <div className="flex flex-col gap-y-2 mt-16 w-[95%] mx-auto ">
      <div className="top">
        <div
          className="flex px-1 py-3 text-gray-700   "
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link
                  to="allTasksLayout"
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  All Tasks
                </Link>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <div className="relative border border-[#00000053] h-fit rounded-xl">
        <div className="mx-[5px] md:mx-[20px] my-2">
          <AllTasks />
        </div>
      </div>
    </div>
  );
}
