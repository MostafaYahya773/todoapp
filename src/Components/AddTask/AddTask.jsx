import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import TaskAnimation from '../TaskAnimation/TaskAnimation';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import useSetTask from '../../hooks/useSetTask';
import { callData } from '../../context/calldata';

export default function AddTask() {
  let { setTaskPageIsActive } = useContext(callData);
  const { mutate, isLoading, isError, error } = useSetTask();

  let [status, setStatus] = useState([
    { number: 1, name: 'Not Started', color: '#F21E1E' },
    { number: 2, name: 'In Prograss', color: '#0225FF' },
  ]);
  let [important, setImportant] = useState([
    { number: 1, color: '#FEBA17', name: 'Normal' },
    { number: 2, color: '#FF6767', name: 'High' },
    { number: 3, color: '#F21E1E', name: 'very High' },
  ]);
  const readImportance = (e) => {
    let newImportance = parseFloat(e.target.value);
    formik.setFieldValue('priority', newImportance);
  };

  const readStatus = (e) => {
    let newStatus = parseFloat(e.target.value);
    formik.setFieldValue('duration', newStatus);
  };

  const readStartDate = (e) => {
    let newDate = e.target.value;
    formik.setFieldValue('labels', [newDate]);
  };

  const formik = useFormik({
    initialValues: {
      content: '', // title
      due_date: '', // End Task
      due_string: '', // notes
      priority: '', //importance
      duration: '', //status
      duration_unit: 'day', // duration
      labels: [], //Start Task
      description: '', // description
    },

    onSubmit: (data) => {
      // set all inputs in varible
      let checkValue = Object.values(data);
      // check for all data and i using string methoud to change any datayype to string
      let hasEmpty = checkValue.some((value) => String(value).trim() === '');

      if (hasEmpty) {
        toast.error('task Not Added');
        setTaskPageIsActive(true);
      } else {
        mutate(data);
        setTimeout(() => {
          toast.success('Task added successfully', {
            position: 'top-center',
          });
          setTaskPageIsActive(false);
        }, 800);
      }
    },
  });

  return (
    <>
      <div className="fixed z-50 w-full h-screen bg-[#00000081] left-0 top-0 flex justify-center  overflow-hidden">
        <TaskAnimation>
          <div className="taskPage grid grid-rows-[auto_1fr] gap-y-5 ">
            <div className="header flex justify-between items-center">
              <h1 className="addtasktitle relative  font-semibold">
                Add New Task
              </h1>
              <button
                onClick={() => setTaskPageIsActive(false)}
                className="border-b-2 border-blackColor font-semibold"
              >
                Go Back
              </button>
            </div>
            <div className="body">
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-7 border border-t-textColor rounded-xl p-3">
                  <div className="one flex flex-col gap-y-5">
                    <div className="title flex flex-col gap-y-2 w-full">
                      <label className="font-semibold">Title</label>
                      <input
                        className="outline-none border border-textColor p-2 rounded-md"
                        type="text"
                        name="content"
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        placeholder="Enter Your Task Name"
                      />
                    </div>
                    <div className="TimeStart flex flex-col gap-y-2 w-full">
                      <label className="font-semibold">Start Task</label>
                      <input
                        className="outline-none border border-textColor p-2 rounded-md"
                        type="date"
                        name="labels"
                        value={formik.values.labels[0]}
                        onChange={readStartDate}
                      />
                    </div>
                    <div className="TimeEnd flex flex-col gap-y-2 w-full">
                      <label className="font-semibold">End Task</label>
                      <input
                        className="outline-none border border-textColor p-2 rounded-md"
                        type="date"
                        name="due_date"
                        value={formik.values.due_date}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="notes flex flex-col gap-y-2 w-full">
                      <label className="font-semibold">Notes</label>
                      <input
                        className="outline-none border border-textColor p-2 rounded-md"
                        type="text"
                        name="due_string"
                        value={formik.values.due_string}
                        onChange={formik.handleChange}
                        placeholder="Enter Your Note"
                      />
                    </div>
                    <div className="important flex flex-col gap-y-2 ">
                      <div className="statusTitle font-semibold">
                        importante
                      </div>
                      <div className="statusDetails flex flex-wrap gap-5 ">
                        {important.map((task) => (
                          <div
                            key={task?.number}
                            className="flex items-center gap-x-2"
                          >
                            <i
                              className="fa-solid fa-circle text-[10px] mt-1"
                              style={{ color: task?.color }}
                            ></i>
                            <label
                              className="cursor-pointer"
                              htmlFor={task?.name}
                            >
                              {task?.name}
                            </label>
                            <input
                              onChange={readImportance}
                              className="mt-1"
                              type="radio"
                              name="importante"
                              value={task?.number}
                              id={task?.name}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="state flex flex-col gap-y-2 ">
                      <div className="statusTitle font-semibold">Status</div>
                      <div className="status flex flex-wrap gap-5">
                        {status?.map((ele) => (
                          <div
                            key={ele?.number}
                            className="flex items-center gap-x-2"
                          >
                            <i
                              className="fa-solid fa-circle text-[10px] mt-1"
                              style={{ color: ele?.color }}
                            ></i>
                            <label
                              className="cursor-pointer"
                              htmlFor={ele?.name}
                            >
                              {ele?.name}
                            </label>
                            <input
                              onChange={readStatus}
                              className="mt-1"
                              name="state"
                              value={ele?.number}
                              id={ele?.name}
                              type="radio"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="two flex flex-col justify-between items-end">
                    <div className="desc flex flex-col gap-y-2 w-full ">
                      <label className="font-semibold">Description</label>
                      <textarea
                        maxLength={700}
                        className="outline-none border border-textColor p-2 rounded-md md:h-[326px] h-[175px]"
                        type="text"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        placeholder="Enter Your Task Details"
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-3 w-full md:w-1/2 lg:w-1/3 bg-primaryColor px-10 py-2 rounded-md text-whiteColor font-medium hover:scale-95"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </TaskAnimation>
      </div>
    </>
  );
}
