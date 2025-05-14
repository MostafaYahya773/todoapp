import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function useRequest(id = '') {
  const query = useQueryClient();
  const getTaskData = () => {
    let url = id ? `api/tasks/${id}` : 'api/tasks/';
    return axios
      .get(url, {
        headers: {
          Authorization: 'Bearer 28bdff91e233b9ff99d93849eee0068191774040',
        },
      })
      .then((response) => response)
      .catch((err) => err);
  };

  const data = useQuery({
    queryKey: ['Data', id],
    queryFn: getTaskData,
    onSuccess: () => query.invalidateQueries({ queryKey: ['Data'] }),
  });

  return data;
}
