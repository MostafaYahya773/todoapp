import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { callData } from '../../context/calldata';
import useRequest from '../../hooks/useRequest';

export default function CalenderResultView() {
  // ust it to show data in box
  let [tasksState, showTaskState] = useState(null);

  // use data which i get it from task in day
  let { taskDataReview, setTaskDetailsActive, setTaskId, setLastOpenId } =
    useContext(callData);

  //call data from api
  let { data, isLoading } = useRequest(taskDataReview);

  useEffect(() => {
    if (data?.data && data?.data.content) {
      showTaskState(data.data);
    } else {
      showTaskState(null);
    }
  }, [data]);

  return (
    <div className=" rounded-lg hidden lg:block ">
      <div className="taskDisplay lg:text-[17px] border  border-[#00000053] h-[279px]  rounded-lg py-2 ">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : tasksState ? (
          <div
            onClick={(e) => {
              e.stopPropagation(),
                setTaskDetailsActive(true),
                setTaskId(tasksState?.id),
                setLastOpenId(tasksState?.id);
            }}
            className="task cursor-pointer grid grid-rows-[auto_auto_auto_auto] gap-y-2 mx-2 p-2 h-[280px] rounded-xl "
          >
            <div className="titles flex flex-col">
              <h1 className="title font-bold text-[14px] md:text-[16px] ">
                {tasksState.content?.length > 45
                  ? `${tasksState?.content.slice(0, 45)}...`
                  : tasksState?.content}
              </h1>
            </div>
            <div className="description">
              <p className="text-textColor text-[15px]  break-all">
                {tasksState.description?.length > 70
                  ? `${tasksState.description?.slice(0, 70)}...`
                  : tasksState.description}
              </p>
            </div>
            <div className="dates gap-y-2 flex items-center justify-start flex-wrap gap-x-20 text-[14px]">
              <div className="start flex flex-col gap-y-1">
                <p className="text-[18px]">Start Date</p>
                <p>
                  <span className="text-textColor">
                    {tasksState?.labels?.[0]}
                  </span>
                </p>
              </div>
              <div className="end start flex flex-col gap-y-1">
                <p className="text-[18px]">End Date</p>
                <p>
                  <span className="text-textColor">
                    {tasksState?.due?.date}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-x-2">
              <p className="text-[18px]">Importance</p>
              <p
                className={`text-[15px] 
                ${
                  tasksState?.priority === 1
                    ? 'text-[#FEBA17]'
                    : tasksState?.priority === 2
                    ? 'text-[#FF6767]'
                    : tasksState?.priority === 3
                    ? 'text-notStartedColor'
                    : ''
                }

                `}
              >
                {tasksState?.priority === 1
                  ? 'Normal'
                  : tasksState?.priority === 2
                  ? 'High'
                  : tasksState?.priority === 3
                  ? 'very High'
                  : ''}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-[25px]  text-textColor h-60 flex justify-center items-center">
            'No Data Found'
          </div>
        )}{' '}
      </div>
    </div>
  );
}
