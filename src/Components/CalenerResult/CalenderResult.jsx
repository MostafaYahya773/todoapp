import React, { useContext, useEffect, useState } from 'react';
import { callData } from '../../context/calldata';
import useRequest from '../../hooks/useRequest';
import useDelete from '../../hooks/useDelete';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function CalenderResult() {
  // test if date have an data or not
  let [tasksState, setTasksState] = useState(false);
  // controle in is task option
  let [isOpend, setIsOpen] = useState(false);
  //get id to send it to api to get data
  let [getId, setGetId] = useState('');
  // save the new data here to show the result in page
  let [newDate, setNewDate] = useState();
  // change status color
  let [color, setColor] = useState();
  // setData is global state and i using it to compare between data
  let {
    setTaskId,
    selectDate,
    setTaskDataReview,
    setTaskDetailsActive,
    setLastOpenId,
  } = useContext(callData);
  // call All Data
  let { data } = useRequest();

  //use delete hook
  let { mutate: delData, isLoading } = useDelete();

  let handleDelete = (id) => {
    delData(id, {
      onSuccess: () => {
        setTimeout(() => {
          toast.success('deleted  success', { position: 'top-center' });
        }, 550);
      },
      onError: () => {
        setTimeout(() => {
          toast.error('deleted Not success', { position: 'top-center' });
        }, 500);
      },
    });
  };
  // handle delete from localstorage
  let HandleDeleteLocalStorage = (id) => {
    let storage = JSON.parse(localStorage.getItem('dataSaved'));
    let result = storage.filter((task) => task?.id !== id);
    localStorage.setItem('dataSaved', JSON.stringify(result));
  };

  useEffect(() => {
    if (!data?.data && data?.data?.content) return;

    let filterDate = data?.data?.filter(
      // index 0 because date saved in index 0
      (ele) => ele?.labels?.[0] === selectDate
    );
    // send data to NewDate state
    setNewDate(filterDate);

    /*filter the data to get all labels using filter to filter element*/
    setTasksState(filterDate?.length > 0);
  }, [data, selectDate]);

  return (
    <div className=" rounded-lg ">
      <div className="taskDisplay lg:text-[17px] flex flex-col gap-y-3 border border-[#00000053] h-[279px] overflow-y-scroll rounded-lg py-2">
        {tasksState ? (
          newDate?.map((ele) => (
            <div
              key={ele.id}
              className="task cursor-pointer grid grid-cols-[1fr_auto]  p-2 rounded-md mx-2 min-h-[130px]  max-h-[400px]  shadow-md border border-[#e7e7e7]"
            >
              <div
                onClick={() => setTaskDataReview(ele.id)}
                className="details flex flex-col gap-y-5"
              >
                <div className="titles flex flex-col gap-y-1">
                  <h1 className="title font-bold text-[18px]">
                    {ele?.content}
                  </h1>
                  <p
                    className={`status text-[14px] ${
                      ele?.duration?.amount === 1
                        ? 'text-notStartedColor'
                        : ele?.duration?.amount === 2
                        ? 'text-inProgressColor'
                        : ele?.duration?.amount === 3
                        ? 'text-completedColor'
                        : ''
                    }`}
                  >
                    {ele?.duration?.amount === 1
                      ? 'Not Started'
                      : ele?.duration?.amount === 2
                      ? 'in Progress'
                      : ele?.duration?.amount === 3
                      ? 'Compaleted'
                      : ''}
                  </p>
                </div>
                <div className="date flex flex-wrap text-[14px] gap-x-3  text-textColor">
                  <div className="started in">{ele?.labels?.[0]}</div>
                  <div className="end">{ele?.due?.date}</div>
                </div>
              </div>

              <span
                onClick={() => setIsOpen(!isOpend)}
                className={`icon -mt-[15px] font-bold text-[25px] px-0 cursor-pointer relative h-[50px]  `}
              >
                ...
                <div
                  className={`ins flex flex-col  absolute -left-[90px] top-11  rounded-lg text-[15px]  bg-[#ffdddd] ${
                    isOpend ? 'block' : 'hidden'
                  } `}
                >
                  <div
                    onClick={() => {
                      handleDelete(ele.id), HandleDeleteLocalStorage(ele.id);
                    }}
                    className="px-5 py-2 flex gap-x-4 items-center text-notStartedColor"
                  >
                    <i className="fa-solid fa-trash"></i>
                    <p>delete</p>
                  </div>
                  <div
                    onClick={(e) => {
                      setTaskDetailsActive(true);
                      setTaskId(ele?.id);
                      setLastOpenId(ele?.id);
                    }}
                    className="px-5 py-2 flex gap-x-4 items-center text-inProgressColor"
                  >
                    <i className="fa-solid fa-folder-open"></i>
                    <p>Open</p>
                  </div>
                </div>
              </span>
            </div>
          ))
        ) : (
          <div className="text-[25px] text-textColor h-96 flex justify-center items-center">
            No Taskes in This Day
          </div>
        )}
      </div>
    </div>
  );
}
