import React, { useContext, useEffect, useState } from 'react';
import useRequest from '../../hooks/useRequest';
import { Link } from 'react-router-dom';
import { callData } from '../../context/calldata';

export default function LastOpen() {
  // set new data here after filtring
  let [newData, setNewData] = useState([]);
  // get global function from context
  let { lastOpenId, setTaskDetailsActive } = useContext(callData);
  // get all data aboud server
  let { data, isLoading } = useRequest(lastOpenId);

  const handleData = () => {
    let result = data?.data;
    if (!result || !result?.id) return;
    setNewData((prev) => {
      // test if id is repeated or not
      let filterData = prev.filter((task) => task?.id !== lastOpenId);
      // handle data
      let update = [result, ...filterData].slice(0, 3);
      //set data in localstorage
      localStorage.setItem('dataSaved', JSON.stringify(update));
      //return data
      return update;
    });
  };

  const handleLocalStorage = () => {
    // get data from local storage
    let result = localStorage.getItem('dataSaved');
    // check the data is impty or full
    if (result) {
      //if full set it in setNewData
      setNewData(JSON.parse(result));
    }
  };

  useEffect(() => {
    // render it the data from localstorage to section
    handleLocalStorage();
    // get data by using id and handle it
    handleData();
  }, [data]);

  return (
    <div className="grid gap-y-2 min-h-[250px]">
      <div className=" grid grid-rows-[auto_1fr] gap-y-2 border overflow-x-scroll gap-x-2 border-textColor rounded-lg p-2 snap-x snap-mandatory">
        <div className="title">
          <h1 className="text-primaryColor font-semibold">Last Open</h1>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center w-full">
            <span className="loader"></span>
          </div>
        ) : newData && newData?.length > 0 ? (
          newData.map((task) => (
            <div
              key={task?.id}
              className="task grid grid-rows-[auto_auto_auto_auto_auto] gap-y-2 p-2 shadow-md border border-[#e7e7e7] w-full md:w-[50%] lg:w-[33%] shrink-0 snap-start rounded-xl"
            >
              <div className="titles">
                <h1 className="title font-bold text-[18px] ">
                  {task.content?.length > 45
                    ? `${task.content.slice(0, 45)}...`
                    : task.content}
                </h1>
              </div>
              <div className="description">
                <p className="text-textColor text-[15px] break-all">
                  {task.description?.length > 100
                    ? `${task.description.slice(0, 100)}...`
                    : task.description}
                </p>
              </div>
              <div className="dates gap-y-2 flex items-center justify-start flex-wrap gap-x-20 text-[14px]">
                <div className="start flex flex-col gap-y-1">
                  <p className="text-[18px]">Start Date</p>
                  <p>
                    <span className="text-textColor">{task.labels?.[0]}</span>
                  </p>
                </div>
                <div className="end start flex flex-col gap-y-1">
                  <p className="text-[18px]">End Date</p>
                  <p>
                    <span className="text-textColor">{task.due?.date}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-x-2">
                <p className="text-[18px]">Importance</p>
                <p
                  className={`text-[15px] 
                    ${
                      task?.priority === 1
                        ? 'text-[#FEBA17]'
                        : task?.priority === 2
                        ? 'text-[#FF6767]'
                        : task?.priority === 3
                        ? 'text-notStartedColor'
                        : ''
                    }
     
                     `}
                >
                  {task?.priority === 1
                    ? 'Normal'
                    : task?.priority === 2
                    ? 'High'
                    : task?.priority === 3
                    ? 'very High'
                    : ''}
                </p>
              </div>
              <button
                onClick={() => {
                  setTaskDetailsActive(true);
                }}
                className="open ms-auto rounded-lg flex justify-center items-center bg-primaryColor text-whiteColor py-0 md:py-2 w-1/3 hover:scale-x-95 hover:transition-all hover:duration-500"
              >
                Open
              </button>
            </div>
          ))
        ) : (
          <div className="md:text-[40px] text-[20px] w-full  text-textColor h-60 flex justify-center items-center">
            No Taskes Opend
          </div>
        )}
      </div>
    </div>
  );
}
