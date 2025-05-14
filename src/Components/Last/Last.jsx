import React from 'react';
import LastOpen from '../LastOpen/LastOpen';
import LastAdd from '../LastAdd/LastAdd';
export default function Last() {
  return (
    <div className="grid grid-rows-[auto_auto] gap-y-5">
      <LastAdd />
      <LastOpen />
    </div>
  );
}
