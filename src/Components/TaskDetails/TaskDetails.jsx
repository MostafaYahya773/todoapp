import React, { useContext, useEffect, useState } from 'react';
import TaskAnimation from '../TaskAnimation/TaskAnimation';
import { callData } from '../../context/calldata';
import useRequest from '../../hooks/useRequest';
import useDelete from '../../hooks/useDelete';
import toast from 'react-hot-toast';
import AnimationDone from '../AnimationDone/AnimationDone';
export default function TaskDetails() {
  // get function from context
  let {
    setTaskDetailsActive,
    taskId,
    addComment,
    getComment,
    deleteComment,
    editComment,
    completedTask,
    setAnimationDone,
  } = useContext(callData);
  // set data in state to use it
  let [newData, setNewData] = useState(null);
  //send data to api
  let { data, isLoading } = useRequest(taskId);
  // get function to use it to deleted task
  let { mutate: delDate } = useDelete();
  // state to get value of input
  const [inputValue, setInputValue] = useState(null);
  // usevalue inside it data of input
  const [saveValue, setSaveValue] = useState(null);
  //state to test if we in edit mode or add mode
  const [isEdit, setIsEdit] = useState(false);
  // state save value witch i clicked for it
  const [returnEditValue, setRetutrEditValue] = useState(null);
  // state to read comment id
  const [commendID, setCommentID] = useState(null);

  // function to delete task
  const handeleDelete = (taskId) => {
    delDate(taskId, {
      onSuccess: () => {
        setTimeout(() => {
          toast.success('deleted  success', { position: 'top-center' });
        }, 500);
      },
      onError: () => {
        setTimeout(() => {
          toast.error('deleted Not Success', { position: 'top-center' });
        }, 500);
      },
    });
  };
  // function to target any change in input
  const getInputValue = (e) => {
    setInputValue(e.target.value);
  };
  // handle Add comment
  const handleAddComment = async () => {
    if (!inputValue.trim()) {
      toast.error('Enter Your Comment', { position: 'top-center' });
      return;
    }
    let result = await addComment(taskId, inputValue);
    if (result) {
      toast.success('comment added', { position: 'top-center' });
      setInputValue('');
    } else {
      toast.error('comment not added', { position: 'top-center' });
    }
  };
  //handle showComments
  const showComments = async () => {
    let result = await getComment(taskId);
    setSaveValue(result?.data);
  };
  // handle delete comment
  const handleDeleteComment = async (commentId) => {
    let result = await deleteComment(commentId);
    if (result) {
      toast.success('commend deleted', { position: 'top-center' });
    } else {
      toast.success('fail to deleted', { position: 'top-center' });
    }
  };
  //function to return state which i clicked for it
  const handleReturnValue = (word) => {
    setRetutrEditValue(word);
  };
  // function to read new update
  const handleUpdateValue = (e) => {
    setRetutrEditValue(e.target.value);
  };
  // handle edit
  const handleEdit = async () => {
    let result = await editComment(commendID, returnEditValue);
    if (result) {
      toast.success('commend Updated', { position: 'top-center' });
      setInputValue('');
      setIsEdit(false);
    } else {
      toast.success('fail to update', { position: 'top-center' });
    }
  };

  const handleCompaleted = async (taskid) => {
    let result = await completedTask(taskid);
    console.log(result);
  };

  useEffect(() => {
    showComments();
    if (!data?.data && data?.data.content) return;
    setNewData(data?.data);
  }, [data, newData, saveValue]);

  return (
    <div className=" z-50 fixed w-full h-screen top-0 bg-[#00000081] left-0 flex justify-center  overflow-hidden">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : (
        <TaskAnimation>
          <div className="taskPage grid grid-rows-[auto_1fr_auto] gap-y-5 ]">
            <div className="header flex justify-between items-center">
              <h1 className="addtasktitle relative font-semibold">
                Task Details
              </h1>
              <button
                onClick={() => setTaskDetailsActive(false)}
                className="border-b-2 border-blackColor font-semibold"
              >
                Go Back
              </button>
            </div>
            <div className="body border border-t-textColor rounded-xl p-3 min-h-[450px]">
              <div className="details__comment grid md:grid-cols-2 grid-cols-1 gap-x-3 gap-y-7 items-start min-h-[420px]">
                <div className="details  grid grid-rows-[auto_auto_auto_auto_auto] gap-y-2 ">
                  <div className="title">
                    <h1 className="font-semibold md:text-[25px] text-[20px] pe-2">
                      {newData?.content}
                    </h1>
                    <p className="text-[15px] text-textColor">
                      {newData?.due?.string}
                    </p>
                  </div>
                  <div className="status__importance flex flex-wrap gap-x-14 gap-y-3">
                    <div className="status flex flex-col gap-y-1">
                      <p className="text-[16px] font-semibold">Status</p>
                      <p
                        className={`text-[15px] 
                  ${
                    newData?.duration?.amount === 1
                      ? 'text-notStartedColor'
                      : newData?.duration?.amount === 2
                      ? 'text-inProgressColor'
                      : newData?.duration?.amount === 3
                      ? 'text-completedColor'
                      : ''
                  } 
                `}
                      >
                        {newData?.duration?.amount === 1
                          ? 'Not Started'
                          : newData?.duration?.amount === 2
                          ? 'in Progress'
                          : newData?.duration?.amount === 3
                          ? 'Compaleted'
                          : ''}
                      </p>
                    </div>

                    <div className="importace flex flex-col gap-y-1">
                      <p className="text-[16px] font-semibold"> importance</p>
                      <p
                        className={`text-[15px] 
                  ${
                    newData?.priority === 1
                      ? 'text-[#FEBA17]'
                      : newData?.priority === 2
                      ? 'text-[#FF6767]'
                      : newData?.priority === 3
                      ? 'text-notStartedColor'
                      : ''
                  } 

                `}
                      >
                        {newData?.priority === 1
                          ? 'Normal'
                          : newData?.priority === 2
                          ? 'High'
                          : newData?.priority === 3
                          ? 'very High'
                          : ''}
                      </p>
                    </div>
                  </div>
                  <div className="descrip flex flex-col gap-y-1">
                    <p className="text-[16px] font-semibold">Description</p>
                    <span className="text-[15px] text-textColor">
                      {newData?.description}
                    </span>
                  </div>
                  <div className="dates gap-y-2 flex items-center justify-start flex-wrap gap-x-20 text-[14px] mt-5">
                    <div className="start flex flex-col gap-y-1">
                      <p className="text-[16px] font-semibold">Start Date</p>
                      <p>
                        <span className="text-textColor">
                          {newData?.labels?.[0]}
                        </span>
                      </p>
                    </div>
                    <div className="end start flex flex-col gap-y-1">
                      <p className="text-[16px] font-semibold">End Date</p>
                      <p>
                        <span className="text-textColor">
                          {newData?.due?.date}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="comment grid grid-rows-[1fr_auto_auto] gap-y-3 min-h-[420px] max-h-[421px]">
                  <ol className="showcomment bg-[#e7e7e7] rounded-xl flex flex-col gap-y-3 py-2 overflow-y-scroll">
                    {saveValue ? (
                      saveValue?.map((comment) => (
                        <li
                          key={comment?.id}
                          className="group w-[97%] mx-auto px-2 py-2 bg-whiteColor rounded-xl grid grid-cols-[1fr_auto] items-center"
                        >
                          <p>{comment?.content}</p>

                          <div className="icons hover:transition-all hover:duration-1000 opacity-0 group-hover:opacity-100 flex gap-x-3">
                            <i
                              onClick={() => handleDeleteComment(comment?.id)}
                              className="fa-solid fa-trash cursor-pointer"
                            ></i>
                            <i
                              onClick={() => {
                                setIsEdit(!isEdit),
                                  handleReturnValue(comment?.content),
                                  setCommentID(comment?.id);
                              }}
                              className="fa-solid fa-pen-to-square cursor-pointer"
                            ></i>
                          </div>
                        </li>
                      ))
                    ) : (
                      <div className="w-full h-full flex justify-center items-center">
                        <span className="loader"></span>
                      </div>
                    )}
                  </ol>
                  <div className="addcomment w-full">
                    {isEdit ? (
                      <input
                        type="text"
                        name="returnEditValue"
                        value={returnEditValue}
                        onChange={handleUpdateValue}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleEdit();
                          }
                        }}
                        placeholder="update value"
                        className="w-full py-2 rounded-md px-2 border border-[#dbd7d7] focus:border-blackColor focus:duration-500 outline-none"
                      />
                    ) : (
                      <input
                        type="text"
                        name="inputValue"
                        value={inputValue}
                        onChange={getInputValue}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddComment();
                          }
                        }}
                        placeholder="Leave your comment here"
                        className="w-full py-2 rounded-md px-2 border border-[#dbd7d7] focus:border-blackColor focus:duration-500 outline-none"
                      />
                    )}
                  </div>
                  {isEdit ? (
                    <button
                      onClick={handleEdit}
                      className="bg-[#e7e7e7] hover:bg-[#ec9b9b] hover:duration-500 text-[18px] font-medium py-3 rounded-md hover:text-whiteColor"
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      onClick={handleAddComment}
                      className="bg-[#e7e7e7] hover:bg-[#ec9b9b] hover:duration-500 text-[18px] font-medium py-3 rounded-md hover:text-whiteColor"
                    >
                      Add Comment
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="links flex flex-wrap gap-x-5 gap-y-5 ms-auto  ">
              <button
                onClick={() => {
                  handleCompaleted(newData?.id), setTaskDetailsActive(false);
                  setAnimationDone(true);
                  setTimeout(() => {
                    setAnimationDone(false);
                  }, 8000);
                }}
                className="py-2 px-12 bg-[#e7e7e7] rounded-md hover:bg-[#ec9b9b] hover:duration-300 hover:text-whiteColor"
              >
                finished
              </button>
              <button
                onClick={() => {
                  handeleDelete(newData?.id);
                  setTaskDetailsActive(false);
                }}
                className="py-2 px-12 bg-[#e7e7e7] rounded-md hover:bg-[#ec9b9b] hover:duration-300 hover:text-whiteColor"
              >
                delete
              </button>
              {/* <button className="py-2 px-12 bg-[#e7e7e7] rounded-md hover:bg-[#ec9b9b] hover:duration-300 hover:text-whiteColor">
                update
              </button> */}
            </div>
          </div>
        </TaskAnimation>
      )}
    </div>
  );
}
