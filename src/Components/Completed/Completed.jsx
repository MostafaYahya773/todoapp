import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskProgressCircle from '../TaskNumber/TaskNumber';
import { callData } from '../../context/calldata';
import useRequest from '../../hooks/useRequest';

export default function Compaleted({ Textcolor, title }) {
  let [textcolor, setTextColor] = useState(Textcolor);
  let [Title, setTitle] = useState(title);
  // state to know number of all tasks
  let [newData, setNewData] = useState(null);
  // state check if found data or not
  let [checkData, setCheckData] = useState();
  //state to know number of tasks was done
  let [totalMession, setTotalMession] = useState(0);
  // call all tasks was done
  let { TaskDone } = useContext(callData);
  //call all tasks
  let { data } = useRequest();

  let handleTaskDone = async () => {
    let result = await TaskDone();
    // know number of taskes done
    let numberTaskDone = result?.data?.items?.length;
    //set number of task here
    setTotalMession(numberTaskDone);
    // know number of alldata
    let allData = data?.data?.length;
    //set number of all task here
    setNewData(allData);
    // check of number of all data
    setCheckData(numberTaskDone);
  };

  useEffect(() => {
    handleTaskDone();
  }, [data, TaskDone]);
  return (
    <div className="notstart grid grid-rows-[auto_auto] border border-[#00000053] bg-[#F8F8F8]  w-full md:w-[49%] lg:w-[33%] snap-start snap-x shrink-0 rounded-xl py-2">
      <p
        className={`text-center mb-2 text-[25px] font-semibold`}
        style={{ color: textcolor }}
      >
        {Title}
      </p>
      <div className="shownumberOfStatus flex flex-col">
        {checkData && (
          <Link to={'/taskdetails'} className="text-end px-5 ">
            View
            <i
              className="fa-solid fa-chevron-right ms-2"
              style={{ color: textcolor }}
            ></i>
          </Link>
        )}

        <div className="num flex justify-around pt-5 w-full">
          <div className="icon">
            <TaskProgressCircle
              completed={checkData && newData}
              total={totalMession}
              color={textcolor}
            />
          </div>
          <div className="number text-[90px]" style={{ color: textcolor }}>
            {checkData ? totalMession : 0}
          </div>
        </div>
      </div>
    </div>
  );
}
