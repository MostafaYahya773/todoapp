import React, { useEffect, useState } from 'react';
import ShowStatus from '../ShowStatus/ShowStatus';
import CalendarView from '../Calender/Calender';
import CalenderResult from '../CalenerResult/CalenderResult';
import CalenderResultView from '../CalenderResultView/CalenderResultView';

export default function Dashboard() {
  return (
    <div className="relative">
      <div className="main py-2 ">
        <div className="grid grid-rows-[auto_auto_auto] gap-y-4">
          <div>
            <ShowStatus />
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-y-5  gap-x-2 ">
            <CalendarView />
            <CalenderResult />
            <CalenderResultView />
          </div>
        </div>
      </div>
    </div>
  );
}
