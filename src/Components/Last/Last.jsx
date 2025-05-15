import React from 'react';
import LastOpen from '../LastOpen/LastOpen';
import LastAdd from '../LastAdd/LastAdd';
import TaskChart from '../Chart/Chart';
export default function Last() {
  return (
    <div className="grid grid-rows-[auto_auto] gap-y-5 md:grid-cols-[2fr_1fr] md:gap-x-5">
      <LastAdd />
      <TaskChart />
    </div>
  );
}
