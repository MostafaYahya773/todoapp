import React, { useContext, useEffect, useState } from 'react';
import useRequest from '../../hooks/useRequest';
import { Link } from 'react-router-dom';
import { callData } from '../../context/calldata';
import useDelete from '../../hooks/useDelete';

export default function LastAdded() {
  // get all data aboud server
  let { data, isLoading } = useRequest();
  // set new data here after filtring
  let [newData, setNewData] = useState();
  // get global function from context
  let { setTaskDetailsActive, setLastOpenId, setTaskId } = useContext(callData);
  //use it to delete task
  const { mutate } = useDelete();
  // handle data to det last 4 length
  const handleData = () => {
    if (!data?.data) return;
    let result = data?.data;
    setNewData(result.slice(-6));
  };
  useEffect(() => {
    handleData();
  }, [data]);
  // function to delete task
  const handleDelete = (id) => {
    mutate(id, {
      onSuccess: () => {
        toast.success('task is deleted', { position: 'top-center' });
      },
      onerror: () => {
        toast.error('task not deleted', { position: 'top-center' });
      },
    });
  };
  return (
    <div className="grid min-h-[250px] ">
      <div className="grid grid-rows-[auto_1fr] gap-y-2 border overflow-y-scroll gap-x-2 border-textColor rounded-lg p-2 ">
        <div className="title px-2">
          <h1 className="text-primaryColor font-semibold">Last Add</h1>
        </div>
        <div className="data flex flex-col gap-y-3">
          {isLoading ? (
            <div className="flex justify-center items-center w-full">
              <span className="loader"></span>
            </div>
          ) : newData && newData.length > 0 ? (
            newData?.map((task) => (
              <div
                key={task?.id}
                className="task grid grid-cols-[auto] gap-y-1 md:grid-cols-[auto_1fr]  items-center gap-x-3 p-2 cursor-pointer shadow-md border border-[#e7e7e7] w-full rounded-xl h-fit"
              >
                <div className="status__import flex gap-x-1 items-center md:order-1 order-2">
                  <div className="status">
                    <p
                      className={`status text-[10px] md:text-[12px] w-fit ${
                        task?.duration?.amount === 1
                          ? 'text-notStartedColor bg-[#f6c6c6] px-1 py-[1px] md:px-3 md:py-1  rounded-sm md:rounded-lg'
                          : task?.duration?.amount === 2
                          ? 'text-inProgressColor bg-[#a5b7ee] px- py-[1px] md:px-2 md:py-1  rounded-sm md:rounded-lg'
                          : ''
                      }`}
                    >
                      {task?.duration?.amount === 1
                        ? 'To Do'
                        : task?.duration?.amount === 2
                        ? 'In Progress'
                        : ''}
                    </p>
                  </div>
                  <div className="import">
                    <p
                      className={`text-[10px] md:text-[12px]
                       ${
                         task?.priority === 1
                           ? 'text-[#FEBA17] bg-[#f2e1b9] px-1 py-[1px] md:px-3 md:py-1 rounded-sm md:rounded-lg'
                           : task?.priority === 2
                           ? 'text-[#FF6767] bg-[#fab9b9] px-1 py-[1px] md:px-3 md:py-1 rounded-sm md:rounded-lg'
                           : task?.priority === 3
                           ? 'text-notStartedColor bg-[#f6c6c6] px-1 py-[1px] md:px-3 md:py-1 rounded-sm md:rounded-lg'
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
                </div>
                <div className="title__del flex justify-between flex-wrap items-center  md:order-2 order-1 ">
                  <div
                    onClick={() => {
                      setTaskDetailsActive(true), setTaskId(task?.id);
                    }}
                    className="titles"
                  >
                    <h1 className="title font-semibold text-[10px] md:text-[14px] ">
                      {task.content?.length > 32
                        ? `${task.content.slice(0, 32)}...`
                        : task.content}
                    </h1>
                  </div>
                  <div className="del">
                    <i
                      onClick={() => handleDelete(task?.id)}
                      className="fa-solid fa-xmark text-textColor text-[10px] sm:text-[16px] cursor-pointer"
                    ></i>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="md:text-[40px] text-[20px] w-full  text-textColor h-60 flex justify-center items-center">
              No Taskes Added
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
