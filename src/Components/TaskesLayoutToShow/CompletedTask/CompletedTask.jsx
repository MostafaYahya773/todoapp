import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { callData } from '../../../context/calldata';
import useDelete from '../../../hooks/useDelete';
import toast from 'react-hot-toast';

export default function ToDoTask() {
  // state to save data after filtring
  let [newData, setNewData] = useState([]);
  // get task compaleted data
  const { TaskDone, setTaskDetailsActive, setTaskId } = useContext(callData);
  //state to save data length
  let [checkLength, setCheckLength] = useState();
  // state to search in completed task
  const [searchValue, setSearchValue] = useState('');
  // function delete task
  const { mutate } = useDelete();

  // function to run handle data
  const handleGetData = async () => {
    const result = await TaskDone();
    // if data dont get dont take ant action
    if (!result) return;
    // filter the data content
    let sliceDate = result?.data?.items?.map((ele) => {
      return {
        // all data get
        ...ele,
        content: ele.content.slice(0, -11),
      };
    });

    setNewData(sliceDate);
    setCheckLength(result?.data?.items?.length);
  };
  //delete the task
  const handleDelete = (id) => {
    mutate(id, {
      onSuccess: () => {
        toast.success('task is deleted', { position: 'top-center' });
        handleGetData();
      },
      onerror: () => {
        toast.error('task not deleted', { position: 'top-center' });
      },
    });
  };

  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <div className="md:my-4 bg-[#EFEEEA] overflow-y-scroll pb-2 rounded-md max-h-[450px] min-h-[400px] relative border border-[#a29e8e] ">
      <div className="sticky top-0 bg-[#EFEEEA] py-2">
        <div className="title py-2 px-2 bg-whiteColor w-[96%] shadow-lg mx-auto rounded-lg mb-4 flex justify-between items-center">
          <div className="name flex gap-x-2 items-center">
            <i className="fa-solid fa-circle text-completedColor text-[10px]"></i>
            <h1 className="text-[20px] font-semibold text-textColor">
              Completed
            </h1>
          </div>
          <div className="number flex gap-x-2 items-center">
            <i className="fa-solid fa-circle-check text-[20px] text-textColor"></i>
            <p className="bg-[#04a30161] px-3 py-1 rounded-md font-bold">
              {newData?.length}
            </p>
          </div>
        </div>
      </div>
      {checkLength > 0 ? (
        newData?.map((task) => (
          <div
            key={task.id}
            className="task flex flex-col gap-y-3 mb-3 mx-2 p-2 shadow-md border border-[#e7e7e7] bg-whiteColor min-h-fit rounded-xl"
          >
            <div className="status flex justify-between items-center  gap-y-3">
              <h1 className="content font-extrabold text-wrap">
                {task?.content}
              </h1>
              <div className="more_option flex gap-x-2 text-textColor cursor-pointer">
                <i
                  onClick={() => {
                    handleDelete(task?.task_id);
                  }}
                  className="fa-solid fa-trash"
                ></i>
                <i
                  onClick={() => {
                    setTaskDetailsActive(true), setTaskId(task?.task_id);
                  }}
                  className="fa-solid fa-book-open"
                ></i>
              </div>
            </div>

            <div className="description overflow-x-hidden">
              <p className="text-textColor text-[15px]">
                {task.description?.length > 100
                  ? `${task.description.slice(0, 100)}...`
                  : task.description}
              </p>
            </div>
            <div className="footer flex justify-between items-center flex-wrap gap-y-2">
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
              <div className="end_task flex justify-center items-center flex-wrap gap-x-2 ">
                <i className="fa-solid fa-circle-check text-textColor mt-1"></i>
                <p className="font-medium ">
                  <span className="font-medium">compaleted at</span>
                  {task?.completed_at.slice(0, -18)}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center mt-32 text-[20px] font-semibold text-textColor">
          No Tasks Founded
        </div>
      )}
    </div>
  );
}
