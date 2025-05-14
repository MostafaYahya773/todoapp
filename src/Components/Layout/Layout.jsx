import React, { useContext, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import AddTask from '../AddTask/AddTask';
import TaskDetails from '../TaskDetails/TaskDetails';
import { callData } from '../../context/calldata';
import AnimationDone from '../AnimationDone/AnimationDone';

export default function Layout() {
  let { taskPageIsActive, taskDetailsActive, animationDone } =
    useContext(callData);

  return (
    <>
      <div className="max-w-[1800px] mx-auto relative">
        {animationDone && <AnimationDone />}
        {taskPageIsActive && <AddTask />}
        {taskDetailsActive && <TaskDetails />}
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}
