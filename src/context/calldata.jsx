import { createContext, useState } from 'react';
import axios from 'axios';
export let callData = createContext();
export default function CallDataContextProvider(props) {
  //select data from calender to calender result
  let [selectDate, setSelectDate] = useState();
  // click an task data to show it in task data review
  let [taskDataReview, setTaskDataReview] = useState(false);
  // check an pageDetails if it open or close and change between them
  let [taskDetailsActive, setTaskDetailsActive] = useState(false);
  // show task options
  let [taskPageIsActive, setTaskPageIsActive] = useState(false);
  // send data to task details to show it
  let [taskId, setTaskId] = useState();
  // send data to last open section
  let [lastOpenId, setLastOpenId] = useState();
  // controle to animation Done
  let [animationDone, setAnimationDone] = useState(false);
  // check if task done or not
  let [isDone, setIsDone] = useState(false);

  let addComment = (id, comment) => {
    return axios
      .post(
        `api/comments`,
        {
          task_id: id,
          content: comment,
        },
        {
          headers: {
            Authorization: 'Bearer 28bdff91e233b9ff99d93849eee0068191774040',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => response)
      .catch((error) => error);
  };

  let getComment = (id) => {
    return axios
      .get(`api/comments?task_id=${id}`, {
        headers: {
          Authorization: 'Bearer 28bdff91e233b9ff99d93849eee0068191774040',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response)
      .catch((error) => error);
  };

  let deleteComment = (commentId) => {
    return axios
      .delete(`api/comments/${commentId}`, {
        headers: {
          Authorization: 'Bearer 28bdff91e233b9ff99d93849eee0068191774040',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response)
      .catch((error) => error);
  };

  let editComment = (commentId, content) => {
    return axios
      .post(
        `api/comments/${commentId}`,
        { content },
        {
          headers: {
            Authorization: 'Bearer 28bdff91e233b9ff99d93849eee0068191774040',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => response)
      .catch((error) => error);
  };

  let completedTask = (task_id) => {
    return axios
      .post(
        `api/tasks/${task_id}/close`,
        {},
        {
          headers: {
            Authorization: 'Bearer 28bdff91e233b9ff99d93849eee0068191774040',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => response)
      .catch((error) => error);
  };

  const TaskDone = () => {
    return axios
      .get(
        `https://api.todoist.com/sync/v9/completed/get_all`,

        {
          headers: {
            Authorization: 'Bearer 28bdff91e233b9ff99d93849eee0068191774040',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => response)
      .catch((error) => error);
  };

  return (
    <callData.Provider
      value={{
        selectDate,
        setSelectDate,
        taskDataReview,
        setTaskDataReview,
        taskDetailsActive,
        setTaskDetailsActive,
        taskPageIsActive,
        setTaskPageIsActive,
        taskId,
        setTaskId,
        lastOpenId,
        setLastOpenId,
        addComment,
        getComment,
        deleteComment,
        editComment,
        completedTask,
        TaskDone,
        animationDone,
        setAnimationDone,
        isDone,
        setIsDone,
      }}
    >
      {props.children}
    </callData.Provider>
  );
}
