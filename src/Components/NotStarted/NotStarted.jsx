import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskProgressCircle from '../TaskNumber/TaskNumber';
import useRequest from '../../hooks/useRequest';
export default function NotStarted({ Textcolor, title }) {
  let [textcolor, setTextColor] = useState(Textcolor);
  let [Title, setTitle] = useState(title);
  let [newData, setNewData] = useState(null);
  let [checkData, setCheckData] = useState();
  let [totalMession, setTotalMession] = useState(0);
  let { data } = useRequest();

  useEffect(() => {
    if (!data?.data) return;
    let NumberOfAllData = data?.data?.length;
    let result = data?.data.filter((ele) => ele?.duration?.amount === 1);
    setNewData(result);
    setTotalMession(NumberOfAllData);
    setCheckData(result?.length > 0);
  }, [data]);
  return (
    <div className="notstart grid grid-rows-[auto_auto] border border-[#00000053] bg-[#F8F8F8] w-full md:w-[49%] lg:w-[33%] snap-start snap-x shrink-0  rounded-xl  py-2">
      <p
        className={`text-center mb-2 text-[25px] font-semibold`}
        style={{ color: textcolor }}
      >
        {Title}
      </p>
      <div className="shownumberOfStatus grid grid-rows-[auto_1fr] items-center  gap-y-5 ">
        {checkData && (
          <Link to={'/taskdetails'} className="text-end px-5 ">
            View
            <i
              className="fa-solid fa-chevron-right ms-2"
              style={{ color: textcolor }}
            ></i>
          </Link>
        )}
        <div className="num flex justify-around  w-full">
          <div className="icon">
            <TaskProgressCircle
              completed={checkData ? newData?.length : 0}
              total={totalMession}
              color={textcolor}
            />
          </div>
          <div className="number text-[90px]" style={{ color: textcolor }}>
            {checkData ? newData?.length : 0}
          </div>
        </div>
      </div>
    </div>
  );
}
