import React, { useContext, useEffect, useState } from 'react';
import useRequest from '../../../hooks/useRequest';
import { Link } from 'react-router-dom';
import { callData } from '../../../context/calldata';
import useDelete from '../../../hooks/useDelete';
import toast from 'react-hot-toast';
export default function ToDoTask() {
  // show and hide the taskdetails window & send id
  const { setTaskDetailsActive, setTaskId } = useContext(callData);
  //save new data in state
  const [newData, setNewData] = useState([]);
  // use it to filter the task
  const [filteredTasks, setFilteredTasks] = useState([]);
  // but the value while i need to search it here
  const [searchValue, setSearchValue] = useState('');
  // get the data from api
  const { data } = useRequest();
  //state to save data length
  let [checkLength, setCheckLength] = useState();
  // send the id here to delete task
  const { mutate } = useDelete();
  // function to dalete task
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
  // function to filter and handle data
  const handleData = () => {
    if (data?.data) {
      const filtered = data.data.filter((ele) => ele?.duration?.amount === 1);
      setNewData(filtered);
      setFilteredTasks(filtered);
    }
  };
  // function to handle search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (!value) {
      setFilteredTasks(newData);
    } else {
      const result = newData.filter((task) =>
        task?.content?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTasks(result);
    }
  };

  //check length
  const checkDataLength = () => {
    if (!data?.data) return;
    setCheckLength(data?.data?.length);
  };
  useEffect(() => {
    handleData();
    checkDataLength();
  }, [data, checkLength]);

  return (
    <div className="md:my-4 bg-[#EFEEEA] overflow-y-scroll pb-2 rounded-md max-h-[450px] relative  min-h-[400px] border border-[#a29e8e]">
      <div className="sticky top-0 bg-[#EFEEEA] py-2">
        <div className="title py-2 px-2 bg-whiteColor w-[96%] shadow-lg mx-auto rounded-lg mb-4 flex justify-between items-center">
          <div className="name flex gap-x-2 items-center">
            <i className="fa-solid fa-circle text-[#f21e1e] text-[10px]"></i>
            <h1 className="text-[20px] font-semibold text-textColor">To Do</h1>
          </div>
          <div className="number flex gap-x-2 items-center">
            <i className="fa-solid fa-arrows-to-dot text-[20px] text-textColor"></i>
            <p className="bg-[#f21e1e61] px-3 py-1 rounded-md font-bold">
              {filteredTasks.length}
            </p>
          </div>
        </div>

        <div className="search mb-2">
          <input
            className="w-[96%] mx-auto block py-2 px-2 shadow-xl rounded-md border-none focus:outline"
            type="search"
            placeholder="search in To Do"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
      </div>
      {checkLength == 0 ? (
        <div className="flex justify-center items-center mt-20 text-[20px] font-semibold text-textColor">
          No Tasks Founded
        </div>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            className="task flex flex-col gap-y-3 mb-3 mx-2 p-2 shadow-md border border-[#e7e7e7] bg-whiteColor min-h-fit rounded-xl"
          >
            <div className="status flex justify-between items-center flex-wrap gap-y-3">
              <p
                className={`status text-[14px] ${
                  task?.duration?.amount === 1 &&
                  'text-notStartedColor bg-[#f6c6c6] px-3 py-1 rounded-lg'
                }`}
              >
                {task?.duration?.amount === 1 && 'Not Started'}
              </p>
              <div className="more_option flex gap-x-2 text-textColor cursor-pointer">
                <i
                  onClick={() => {
                    handleDelete(task?.id);
                  }}
                  className="fa-solid fa-trash"
                ></i>
                <i
                  onClick={() => {
                    setTaskDetailsActive(true), setTaskId(task?.id);
                  }}
                  className="fa-solid fa-book-open"
                ></i>
              </div>
            </div>
            <div className="content">
              <p className=" text-[18px] font-semibold">
                {task.content?.length > 70
                  ? `${task.description.slice(0, 70)}...`
                  : task.content}
              </p>
            </div>
            <div className="description overflow-x-hidden">
              <p className="text-textColor text-[15px]">
                {task.description?.length > 100
                  ? `${task.description.slice(0, 100)}...`
                  : task.description}
              </p>
            </div>
            <div className="importance flex justify-between flex-wrap pb-3 border-b border-blackColor">
              <div className="startDate flex items-center gap-x-2">
                <i class="fa-solid fa-flag text-textColor"></i>
                <p className="font-medium">{task?.labels[0]}</p>
              </div>
              <div className="state">
                <p
                  className={`text-[15px] 
                ${
                  task?.priority === 1
                    ? 'text-[#FEBA17] bg-[#f2e1b9] px-3 py-1 rounded-lg '
                    : task?.priority === 2
                    ? 'text-[#FF6767] bg-[#fab9b9] px-3 py-1 rounded-lg '
                    : task?.priority === 3
                    ? 'text-notStartedColor bg-[#f6c6c6] px-3 py-1 rounded-lg '
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
            <div className="footer flex justify-between items-center flex-wrap">
              <Link
                onClick={() => {
                  setTaskDetailsActive(true), setTaskId(task?.id);
                }}
                className="comments flex items-center gap-x-1 flex-wrap "
              >
                <i className="fa-solid fa-comment text-textColor"></i>
                <p>Comments</p>
                <p>{task?.comment_count}</p>
              </Link>
              <div className="end_task flex justify-center items-center gap-x-2">
                <i class="fa-solid fa-hourglass-end text-textColor"></i>
                <p className="font-medium">{task?.due?.date}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
