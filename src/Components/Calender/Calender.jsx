// CalendarView.jsx
import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { callData } from '../../context/calldata';
const CalendarView = () => {
  const [value, setValue] = useState(new Date());
  let { setSelectDate, selectDate } = useContext(callData);

  useEffect(() => {
    let newDate = value?.toLocaleDateString('en-CA').slice(0, 10).trim();
    setSelectDate(newDate);
  }, [value]);

  return (
    <div className="">
      <Calendar onChange={setValue} value={value} />
    </div>
  );
};

export default CalendarView;
