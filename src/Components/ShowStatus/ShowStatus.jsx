import React from 'react';
import NotStarted from '../NotStarted/NotStarted';
import InPrograss from '../InPrograss/InPrograss';
import Completed from '../Completed/Completed';
import { Link } from 'react-router-dom';

export default function ShowStatus() {
  return (
    <div className="status grid  gap-y-0 ">
      <div className="allstatus justify-start flex gap-x-2 overflow-x-scroll xl:overflow-x-visible  snap-mandatory snap-x ">
        <NotStarted Textcolor="#f21e1e " title="To Do" />
        <InPrograss Textcolor=" #0225ff" title="In Prograss" />
        <Completed Textcolor=" #05a301" title="Completed" />
      </div>
    </div>
  );
}
