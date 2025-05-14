import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';

export default function useSetTask() {
  const queryClient = useQueryClient();
  const setTaskData = (data) => {
    let url = 'api/tasks/';
    return axios
      .post(url, data, {
        headers: {
          Authorization: 'Bearer 28bdff91e233b9ff99d93849eee0068191774040',
        },
      })
      .then((response) => response)
      .catch((err) => err);
  };
  const setData = useMutation({
    mutationFn: setTaskData,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['Data'] }),
  });
  return setData;
}
